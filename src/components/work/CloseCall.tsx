import type { ReactNode } from 'react';
import { CallInvitation } from '@/components/pages/CallInvitation';

type Props = {
  title: string;
  body: ReactNode;
  /** Prefix for the analytics labels on the two buttons. */
  track: string;
};

/** The end of every work page: a call, or the website check. */
export function CloseCall({ title, body, track }: Props) {
  return <CallInvitation id={`${track}-close`} title={title} text={body} track={track} />;
}
