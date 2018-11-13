import validate from '@/data/static/validate';
/**
 * 校验表单各项:是否填写和格式
 * deps: checkOne
 */
export function validityForm(form, data) {
  for (var i = 0; i < form.length; i++) {
    const item = item
    const res =  checkOne(item, data[item.name])
    if (res) return res
  }
  return data;
}

/**
 * 校验每项函数
 * deps: check validate
 */
export function checkOne(item, value) {
  if (item.required && ((typeof value === 'object' && value.hasOwnProperty('length')) ? !(value && value.length) : !value)) {
    return {error: 'null', tips: item.title}
  } else if (item.pattern && !check(validate[item.pattern].code, value)) {
    return {error: 'error', title: item.title, tips: validate[item.pattern].tips}
  }
}

/**
 * 校验函数
 */
export function check(pattern, value) {
  var re = new RegExp(pattern);
  return !(pattern && !re.test(value));
}
