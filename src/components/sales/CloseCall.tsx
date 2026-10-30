import type { ReactNode } from 'react';
import { CallInvitation } from '@/components/pages/CallInvitation';

type Props = {
  id: string;
  title: ReactNode;
  text: ReactNode;
  track: string;
};

/** Every page ends with a way to book a call, on the dark band that runs into the footer. */
export function CloseCall({ id, title, text, track }: Props) {
  return <CallInvitation id={id} title={title} text={text} track={track} />;
}
