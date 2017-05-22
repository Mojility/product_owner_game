import numeral from 'numeral';

export class DecimalValueConverter {
  toView(value, format) {
    if (!format) format = '0.00';
    return numeral(value).format(format);
  }
}