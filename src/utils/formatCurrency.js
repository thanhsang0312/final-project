const formatNumber = (x = 0) => { 
    return x = x.toLocaleString('it-IT', {style : 'currency', currency : 'VND'});
 }

 export default formatNumber;

export const formatUSD = (x = 0) => {
    return x = x.toLocaleString('en-US', {
  style: 'currency',
  currency: 'USD',
})
}

export const removeAccents = (str) => {
   var from = "àáãảạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệđùúủũụưừứửữựòóỏõọôồốổỗộơờớởỡợìíỉĩịäëïîöüûñçýỳỹỵỷ",
      to   = "aaaaaaaaaaaaaaaaaeeeeeeeeeeeduuuuuuuuuuuoooooooooooooooooiiiiiaeiiouuncyyyyy";
  for (var i=0, l=from.length ; i < l ; i++) {
    str = str.replace(RegExp(from[i], "gi"), to[i]);
  }

  return str;
}