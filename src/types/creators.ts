interface UserProfile {
    userName: string;
    imageUrl: string;
    name: string;
    isCreatorProfile: boolean;
    isCreatorAccountApproved: boolean;
}

interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    isActive: boolean;
    userProfile: UserProfile;
    createdAt: string;
    updatedAt: string;
}

interface CreatorDetail {
    id: string;
    dateOfBirth: string;
    idScanned: string;
    holdingId: string;
    gender: string;
    bio: string;
    isApproved: boolean;
    user: User;
    subscriptionCount: number;
    postCount: number;
    likeCount: number;
}
