import React, { ReactElement } from 'react';
import User from '../../account/types/User';
import MobileProfileCard from './MobileProfileCard';
import ProfileCard from './ProfileCard';

type ProfileDetailsColumnProps = {
  user: User
}

export default function ProfileDetailsColumn({ user }: ProfileDetailsColumnProps): ReactElement {
  return <>
    <ProfileCard {...user} />
    <MobileProfileCard {...user} />
  </>
}