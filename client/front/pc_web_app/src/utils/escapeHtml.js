import faces from "@/assets/js/face";

const escapeHtml = (val = "") => {
  if (val === "") {
    return;
  }
  // 表情
  let result = val;
  const face = /\sface\[\W+]/g;
  if (face.test(result)) {
    let group = result.match(face);
    group.map(item => {
      const key = item.match(/\[\S+]/g)[0];
      result = result.replace(item, `<img src="${faces[key]}">`);
    });
  }
  // 图片
  const img = /img\[\S+]/g;
  if (img.test(result)) {
    const group = result.match(img);
    group.map(item => {
      result = result.replace(
        item,
        `<img src="${item.substr(4, item.length - 5)}">`
      );
    });
  }
  // 链接 a(链接)[标题]
  const link = /\sa\(\S+]/g;
  if (link.test(result)) {
    const group = result.match(link);
    const title = /\((.+?)\)/;
    const linkName = /\[(.+?)]/;
    group.map(item => {
      const nameGroup = item.match(linkName);
      let name = "";
      if (nameGroup.length > 0) {
        name = nameGroup[1];
      }
      const linkGroup = item.match(title);
      let link = "";
      if (linkGroup.length > 0) {
        link = linkGroup[1];
      }
      result = result.replace(item, `<a href="${link}">${name}</a>`);
    });
  }
  // 引用
  const quote = /(\[quote]\n)(.+)(\n\[\/quote])/g;
  if (quote.test(result)) {
    const quoteGroup = result.match(quote);
    quoteGroup.map(item => {
      const content = item.match(/(\[quote]\n)(.+)(\n\[\/quote])/)[2];
      result = result.replace(
        /(\[quote]\n)(.+)(\n\[\/quote])/,
        `<div class="layui-elem-quote">${content}</div>`
      );
    });
  }

  // 代码块
  // hr
  return result;
};

export { escapeHtml };
