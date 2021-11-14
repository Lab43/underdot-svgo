const SVGO = require('svgo')
    , p = require('path')
;



module.exports = ({ rule = '**/*.svg' , ...config } = {}) => ({ registerFileHandler, registerTemplateHelper }) => {

  const svgo = new SVGO(config);
  const svgs = {};

  registerFileHandler(rule, async ({ path, file }) => {
    const result = await svgo.optimize(file, {path});
    svgs[p.join('/', path)] = result.data;
    return {
      path,
      file: Buffer.from(result.data),
    };
  });

  registerTemplateHelper('svgo', (metadata, src) => {
    const path = p.isAbsolute(src)
      ? src
      : p.join('/', metadata.dirname, src)
    ;
    return svgs[path];
  });

}
