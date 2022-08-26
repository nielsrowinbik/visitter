import { isDate } from "lodash";
import { format as toFormatted } from "date-fns";

type Props = {
  children: string | Date;
  format: string;
};

export const FormattedDate = ({ children, format }: Props) => {
  const date = isDate(children) ? children : new Date(children);
  const formatted = toFormatted(date, format);

  return <time>{formatted}</time>;
};
