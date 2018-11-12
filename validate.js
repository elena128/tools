module.exports = {
  tel: {
    code: '^1[34578][0-9]{9}$',
    tips: 'validate.tel'
  },
  password: {
    code: '^[0-9a-zA-Z_]{6,16}$',
    tips: 'validate.password'
  },
  idCard: {
    code: '^([0-9]{15}$|^[0-9]{18}$|^[0-9]{17}([0-9]|X|x))$',
    tips: 'validate.idCard'
  },
  bankCard: {
    code: '^[0-9]{16,21}$',
    tips: 'validate.bankCard'
  },
  computeAddress: {
    code: '^[0-9a-zA-Z]{34,}$',
    tips: 'validate.computeAddress'
  },
  floatF: {
    code: '(^([1-9][0-9]*)([.][0-9]{1,4})?$|^0[.][0-9]{1,8}?$)|0',
    tips: 'validate.floatF'
  },
  intF: {
    code: '^[0-9]+$',
    tips: 'validate.intF'
  },
  num: {
    code: '^[1-9][0-9]*$',
    tips: 'validate.num'
  },
  smallInt: {
    code: '^([0-9]|10)$',
    tips: 'validate.smallInt'
  },
  email: {
    code: '^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+', // ^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$或^[a-z\d]+(\.[a-z\d]+)*@([\da-z](-[\da-z])?)+(\.{1,2}[a-z]+)+$
    tips: 'validate.email'
  },
  ip: {
    code: '((25[0-5]|2[0-4][0-9]|((1[0-9]{2})|([1-9]?[0-9])))[.]){3}(25[0-5]|2[0-4][0-9]|((1[0-9]{2})|([1-9]?[0-9])))',
    tips: 'validate.ip'
  },
  number: {
    code: '(^([1-9][0-9]*)([.][0-9]{1,4})?$|^0[.][0-9]{1,}?$|^0$)',
    tips: 'validate.number'
  },
  allNumber: {
    code: '(^-?([1-9][0-9]*)([.][0-9]{1,})?$|^-?0[.][0-9]{1,}?$|^0$)',
    tips: 'validate.allNumber'
  },
  amount: {
    code: '(^([1-9][0-9]*)([.][0-9]{1,})?$|^0[.][0-9]{1,}?$)',
    tips: 'validate.amount'
  },
  ratio: {
    code: '(^([1-9][0-9]*)([.][0-9]{1,4})?$|^0[.][0-9]{1,4}?$)',
    tips: 'validate.ratio'
  },
  upLetter: {
    code: '^[A-Z]+$',
    tips: 'validate.upLetter'
  },
  url: {
    code: '[a-zA-z]+://.*',
    tips: 'validate.url'
  },
  phone: {
    code: '^[0-9]{3}-[0-9]{8}|[0-9]{4}-[0-9]{7}$',
    tips: 'validate.phone'
  },
  link: {
    code: '((http|ftp|https|file):\/\/([\w\-]+\.)+[\w\-]+(\/[\w\u4e00-\u9fa5\-\.\/?\@\%\!\&=\+\~\:\#\;\,]*)?)', // /ig或/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/
    tips: 'validate.link'
  }
};

// 非负小数或整数 ^\d*\.?\d*$
// 首尾为特定字符     ^a.*g$  /abc="[^"]*/
// 特殊字符    ^[\u4e00-\u9fa5_a-zA-Z0-9]+$
// 1~365之间的数字 \b[1-9]\b|\b[1-9]\d\b|\b[1-2]\d\d\b|\b[1-3][0-5]\d\b|\b360\b|\b361\b|\b362\b|\b363 \b|\b364\b|\b365\b
// 百分比    ^-?\d+%$
// 密码：包含大小写字母和数字的组合，长度在8-10之间 ^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,10}$
// 中文        ^[\u4e00-\u9fa5]+$
// 金额：2位小数 ^[0-9]+(.[0-9]{1,2})?$
