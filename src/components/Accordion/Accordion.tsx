type Props = {
  name?: string;
};

export const Accordion = ({ name = '은채' }: Props) => <div>Hello, {name}! 👋</div>;
