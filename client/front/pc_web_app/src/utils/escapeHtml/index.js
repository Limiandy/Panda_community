// import faces from "@/assets/js/face";
import "./main.css";
const escapeHtml = (val = "") => {
  const element = document.createElement("div");
  element.className = "detail-body";
  element.innerHTML = val;
  console.log(element);
  // 表情
  // const face = /\sface\[\W+]/g;
  // if (face.test(result)) {
  //   let group = result.match(face);
  //   group.map(item => {
  //     const key = item.match(/\[\S+]/g)[0];
  //     result = result.replace(item, `<img src="${faces[key]}" alt="">`);
  //   });
  // }
  // 图片
  // const img = /<img \S.*?>/g;
  // if (img.test(result)) {
  //   const group = result.match(img);
  //   const pos = /width="(\d+)" height="(\d+)"/g;
  //   group.map(item => {
  //     let width, height;
  //     if (pos.test(item)) {
  //       pos.test(item);
  //       width = parseInt(RegExp.$1);
  //       height = parseInt(RegExp.$2);
  //     } else {
  //       width = 716;
  //       height = 715;
  //     }
  //
  //     const Prop = Math.floor((width / height) * 1000) / 1000;
  //     if (width > 716) {
  //       width = 716;
  //       height = Math.ceil(width / Prop);
  //     }
  //     const newItem = item.replace(pos, `width="${width}" height="${height}"`);
  //     result = result.replace(item, newItem);
  //   });
  // }
  // console.log(result);
  // 链接 a(链接)[标题]
  // const link = /\sa\(\S+]/g;
  // if (link.test(result)) {
  //   const group = result.match(link);
  //   const title = /\((.+?)\)/;
  //   const linkName = /\[(.+?)]/;
  //   group.map(item => {
  //     const nameGroup = item.match(linkName);
  //     let name = "";
  //     if (nameGroup.length > 0) {
  //       name = nameGroup[1];
  //     }
  //     const linkGroup = item.match(title);
  //     let link = "";
  //     if (linkGroup.length > 0) {
  //       link = linkGroup[1];
  //     }
  //     result = result.replace(item, `<a href="${link}">${name}</a>`);
  //   });
  // }
  // 引用
  // const quote = /(\[quote]\n)(.+)(\n\[\/quote])/g;
  // if (quote.test(result)) {
  //   const quoteGroup = result.match(quote);
  //   quoteGroup.map(item => {
  //     const content = item.match(/(\[quote]\n)(.+)(\n\[\/quote])/)[2];
  //     result = result.replace(
  //       /(\[quote]\n)(.+)(\n\[\/quote])/,
  //       `<div class="layui-elem-quote">${content}</div>`
  //     );
  //   });
  // }

  // 代码块
  // hr
  return element;
};

export { escapeHtml };
