import { UserProfile } from "@clerk/clerk-react";

export default function UserProfilePage() {
  return (
    <div className="center-page">
      <UserProfile path="/user-profile" routing="path" />
    </div>
  );
}