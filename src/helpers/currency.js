export const currency = function(number , format = 'es-us', currency='USD' , digits =2){
    return new Intl.NumberFormat(format, {style: 'currency',currency, minimumFractionDigits: digits}).format(number);
};