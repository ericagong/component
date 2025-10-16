type Props = {
  name?: string;
};

export function Accordion({ name = '은채' }: Props) {
  return <div>Hello, {name}! 👋</div>;
}
