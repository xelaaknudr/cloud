const fileService = require('../services/fileService');
const User = require('../models/User');
const File = require('../models/File');
const fs = require('fs');
const uuid = require('uuid');
const path = require('path');

class FileController {
  async createDir(req, res) {
    try {
      const {name, type, parent} = req.body
      const file = new File({name, type, parent, user: req.user.id})
      const parentFile = await File.findOne({_id: parent})
      if (!parentFile) {
        file.path = name;
        await fileService.createDir(file);
      } else {
        file.path = `${parentFile.path}/${file.name}`;
        await fileService.createDir(file);
        parentFile.childs.push(file._id);
        await parentFile.save();
      }
      await file.save();
      return res.json(file);
    } catch (e) {
      console.log(e);
      return res.status(400).json(e);
    }
  }

  async getFiles(req, res) {
    try {
      let files;
      const {sort} = req.query;
      switch (sort){
        case 'date':
          files = await File.find({user: req.user.id, parent: req.query.parent}).sort({ date: 1 });
          break;
        case 'type':
          files = await File.find({user: req.user.id, parent: req.query.parent}).sort({ type: 1 });
          break;
        case 'name':
          files = await File.find({user: req.user.id, parent: req.query.parent}).sort({ name: 1 });
          break;

        default:
          files = await File.find({user: req.user.id, parent: req.query.parent});
          break;
      }
      return res.json(files);
    } catch (e) {
      console.log(e);
      return res.status(500).json({message: 'Can not get files'});
    }
  }

  async uploadFile(req, res) {
    try {
      const file = req.files.file
      const parent = await File.findOne({user: req.user.id, _id: req.body.dirId})
      const user = await User.findOne({_id: req.user.id})
      if (user.usedSpace + file.size > user.diskSpace) {
        return res.status(400).json({message: 'There no space on the disk'})
      }
      user.usedSpace = user.usedSpace + file.size

      let path;
      if (parent) {
        path = `${__dirname.split('controllers')[0]}files/${user._id}/${parent.path}/${file.name}`
      } else {
        path = `${__dirname.split('controllers')[0]}files/${user._id}/${file.name}`
      }
      if (fs.existsSync(path)) {
        return res.status(400).json({message: 'File already exist'})
      }
      file.mv(path)
      const type = file.name.split('.').pop()
      let filePath = file.name;
      if(parent){
        filePath = `${parent.path}/${file.name}`
      }
      const dbFile = new File({
        name: file.name,
        type,
        size: file.size,
        path: filePath,
        parent: parent?._id,
        user: user._id
      })
      await dbFile.save()
      await user.save()
      res.json(dbFile)
    } catch (e) {
      console.log(e)
      return res.status(500).json({message: "Upload error"})
    }
  }

  async downloadFile(req, res) {
    try {
      const file = await File.findOne({ _id: req.query.id, user: req.user.id })
      console.log(file);
      const path = `${__dirname.split('controllers')[0]}files/${req.user.id}/${file.path}`
      if(fs.existsSync(path)){
        return res.download(path, file.name)
      }
      return res.status(400).json({ message: 'File not found' })
    } catch (e) {
      console.log(e)
      return res.status(500).json({message: "Downloaded error"})
    }
  }


  async deleteFile(req, res){
    try {
      const file = await File.findOne({ _id: req.query.id, user: req.user.id })
      if(!file){
        res.status(400).json({ message: 'Not found' })
      }
      fileService.deleteFile(file);
      await file.remove();
      return res.json({ message: 'File removed' })
    } catch (e) {
      console.log(e);
      return res.status(400).json({message: "Delete error"})
    }
  }

  async searchFile(req, res){
    try {
      const search = req.query.search;
      let files = await File.find({ user: req.user.id })
      files = files.filter(file => file.name.includes(search))
      return res.json(files);
    } catch (e) {
      console.log(e);
      return res.status(500).json({message: "File not found"})
    }
  }

  async uploadAvatar(req, res){
    try {
      console.log('uploadind')
      let file = req.files.file;
      let user = await User.findById(req.user.id);
      const avatarName = uuid.v4() + '.jpg';
      file.mv(`${path.join(__dirname, '..', 'static')}/${avatarName}`)
      user.avatar = avatarName;
      await user.save()
      return res.json(user)
    } catch (e) {
      console.log(e);
      return res.status(400).json({message: "Upload avatar error"})
    }
  }

  async deleteAvatar(req, res){
    try {
      let user = await User.findById(req.user.id);
      fs.unlinkSync(`${path.join(__dirname, '..', 'static')}/${user.avatar}`)
      user.avatar = null;
      await user.save()
      return res.json(user)
    } catch (e) {
      console.log(e);
      return res.status(400).json({message: "Deleted avatar error"})
    }
  }



}

module.exports = new FileController();



