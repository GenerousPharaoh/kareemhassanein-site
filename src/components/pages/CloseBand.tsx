import type { ReactNode } from 'react';
import { CallInvitation } from './CallInvitation';
import { Keep } from './Keep';

type Props = {
  title?: ReactNode;
  line?: ReactNode;
  /** Show the website check beside the call. */
  check?: boolean;
  /** Analytics label prefix for the two buttons. */
  track?: string;
};

/** The way every page ends: a call, or the website check. */
export function CloseBand({
  title = (
    <>
      Start with a <Keep>20-minute</Keep> call.
    </>
  ),
  line = 'Tell me what is not working. There is nothing to prepare except your site address.',
  check = true,
  track = 'close',
}: Props) {
  return <CallInvitation id="close-title" title={title} text={line} track={track} check={check} />;
}
