// Tanner Fry
// tannerf1101@yahoo.com
// Data on all changes for the app

interface IChangeLogProps {
    title: string;
    version: string;
    date: string;
    changes: string[];
}

export const CHANGE_LOG_DATA: IChangeLogProps[] = [
    {
        title: 'The Beginning',
        version: '1.0.0 - 1.0.7',
        date: '08/28/2023 - 09/29/2023',
        changes: [
            'Added animals dashboard',
            'Added cooking dashboard',
            'Added explore dashboard',
            'Added gardening dashboard',
            'Added maintenance dashboard',
            'Added news dashboard',
            'Added notes dashboard',
            'Added pricing page',
            'Added Q&A page',
            'Added settings dashboard',
            'Added weather dashboard',
            'Added README for API endpoints',
            'Integrated animations for left menu',
            'Integrated API/database for gardening dashboard',
            'Integrated API/OTP password resetting as well as email verification',
            'Integrated app-wide notifications via server',
            'Integrated basic theme customization for the popout menu',
            'Integrated content gates based on subscription status',
            'Integrated file uploading endpoints for gardening dashboard',
            'Integrated idle timeout/logout for security',
            'Integrated gardening layout builder for diagram building and attachment to gardens',
            'Integrated OpenWeather API for weather dashboard',
            'Integrated Stripe',
            'Integrated weather map with multiple layer selection',
            'Updated dashboard icons',
        ]
    },
    {
        title: '',
        version: '1.0.8',
        date: '',
        changes: [
            'Added feedback button to the app footer',
            'Integrated feedback API endpoint and MySQL table',
        ]
    }
]