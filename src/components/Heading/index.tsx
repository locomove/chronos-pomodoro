import styles from './styles.module.css';
type HeadingProps = {
  children: React.ReactNode;
};

export function Heading(props: HeadingProps) {
  //pode ser escrito Heading({children}: HeadingProps)
  return <h1 className={styles.heading}>{props.children}</h1>;
} // no h1 passase somente {children}
