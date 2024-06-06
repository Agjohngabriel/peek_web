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

export interface CreatorDetail {
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



export interface AdminDashboardData {
    totalCreators:              number;
    totalUsers:                 number;
    totalRevenue:               number;
    totalIncome:                number;
    totalLikes:                 number;
    totalSubscriptions:         number;
    totalAmountSubscribed:      number;
    totalCashWithdrawn:         number;
    totalPaidPostSubscriptions: number;
    totalPaidChatSubscriptions: number;
    totalPaidCallSubscriptions: number;
    monthlyRevenues:            MonthlyRevenue[];
}

export interface MonthlyRevenue {
    year:             number;
    month:            number;
    subscriptionType: number;
    revenue:          number;
}
