import classNames from 'classnames/bind';

const createCx = (styles: Record<string, string>) => classNames.bind(styles);

export default createCx;
