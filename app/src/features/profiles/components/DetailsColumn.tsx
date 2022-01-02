import React, { ReactElement } from 'react';
import MobileProfileCard from './MobileProfileCard';
import ProfileCard from './ProfileCard';

export default function ProfileDetailsColumn(): ReactElement {
  return <>
    <ProfileCard />
    <MobileProfileCard />
  </>
}