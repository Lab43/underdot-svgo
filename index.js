const SVGO = require('svgo');



module.exports = ({ rule = '**/*.svg' , ...config } = {}) => ({ registerFileHandler }) => {

  const svgo = new SVGO({});

  registerFileHandler(rule, async ({ path, file }) => {
    const result = await svgo.optimize(file);
    return {
      path,
      file: Buffer.from(result.data),
    };
  });

}
