const fs = require('fs');

class FileService {
  createDir(file) {
    const filePath = this.getPath(file);
    return new Promise((resolve, reject) => {
      try {
        if (!fs.existsSync(filePath)) {
          fs.mkdirSync(filePath);
          return resolve({message: 'file created'});
        } else {
          return reject({message: 'File already exist'});
        }
      } catch (e) {
        return reject({message: 'File error'});
      }
    });
  }
  deleteFile(file) {
    const path = this.getPath(file);
    if(file.type === 'dir'){
      fs.rmdirSync(path)
    } else {
      fs.unlinkSync(path)
    }
  }

  getPath(file) {
    return `${__dirname.split('services')[0]}files/${file.user}/${file.path}`;
  }
}

module.exports = new FileService();

