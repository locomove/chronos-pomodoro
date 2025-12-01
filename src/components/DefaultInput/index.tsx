import style from './styles.module.css';

type DefaultInputprops = {
  id: string;
  labelText?: string;
} & React.ComponentProps<'input'>;
export function DefaultInput({
  labelText,
  id,
  type,
  ...rest
}: DefaultInputprops) {
  return (
    <>
      {labelText && <label htmlFor={id}>{labelText}</label>}
      <input className={style.input} id={id} type={type} {...rest} />
    </>
  );
}
