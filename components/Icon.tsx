import { AiFillApple, AiFillFacebook, AiOutlineGoogle } from "react-icons/ai";
import {
  HiArrowTopRightOnSquare,
  HiOutlineArrowDownCircle,
  HiOutlineArrowRight,
  HiOutlineCheck,
  HiOutlineCheckCircle,
  HiOutlineChevronLeft,
  HiOutlineChevronRight,
  HiOutlineClipboardDocument,
  HiOutlineEllipsisVertical,
  HiOutlinePencil,
  HiOutlineTrash,
  HiOutlineUser,
  HiOutlineXMark,
} from "react-icons/hi2";

import { CgSpinner } from "react-icons/cg";
import type { IconBaseProps } from "react-icons";
import { cn } from "@/lib/utils";

const Logo = ({ className, ...props }: IconBaseProps) => (
  <svg
    className={cn("", className)}
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 68 62"
    {...props}
  >
    <path d="M62,1.34a10.44,10.44,0,0,0-14.23,4l-23,41A10.45,10.45,0,1,0,43,56.55l23-41A10.45,10.45,0,0,0,62,1.34Z" />
    <path d="M21.34,10a10.92,10.92,0,0,0-1.13-4.17A10.68,10.68,0,0,0,1.14,15.48l11,21.74a5.65,5.65,0,0,0,10.68-2.87Z" />
  </svg>
);

export const Icon = {
  Apple: AiFillApple,
  ArrowDownCircle: HiOutlineArrowDownCircle,
  ArrowRight: HiOutlineArrowRight,
  Checkmark: HiOutlineCheck,
  CheckmarkCircle: HiOutlineCheckCircle,
  ChevronLeft: HiOutlineChevronLeft,
  ChevronRight: HiOutlineChevronRight,
  Close: HiOutlineXMark,
  Copy: HiOutlineClipboardDocument,
  Dots: HiOutlineEllipsisVertical,
  Facebook: AiFillFacebook,
  Google: AiOutlineGoogle,
  Leave: HiArrowTopRightOnSquare,
  Logo,
  Pencil: HiOutlinePencil,
  Spinner: CgSpinner,
  Trash: HiOutlineTrash,
  User: HiOutlineUser,
};
