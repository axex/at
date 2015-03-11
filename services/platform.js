module.exports = {
  isWindows: function () {
    return process.platform === 'win32';
  },

  isMacOSX: function() {
    return process.platform === 'darwin';
  },

  isLinux: function () {
    return process.platform === 'linux';
  },

  isBSD: function () {
    return process.platform === 'freebsd';
  }
};
