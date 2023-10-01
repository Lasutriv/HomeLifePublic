import { IMaintenanceItemsProps } from "../Maintenance";
import { ICookingRecipeProps } from "./elements/ContainerRecipes";

export const COMMON_MAINTENANCE_DATA: IMaintenanceItemsProps[] = [
    {
        taskName: 'Change air filters',
        icon: 'fa fa-filter',
        taskDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vi',
        cost: 100,
        dueDate: new Date(),
        status: 'pending',
        reoccuringDue: 'quarterly',
        toolTip: {
            title: 'Note',
            description: 'You may want to review your current air filter size before purchasing new ones. You can also '
                         + 'clean your current air filter with vinegar and water if its not a disposable, but a reusable one.'
        }
    },
    {
        taskName: 'Check fire extinguishers',
        icon: 'fa fa-fire-extinguisher',
        taskDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vi',
        cost: 200,
        dueDate: new Date(),
        status: 'completed',
        reoccuringDue: 'yearly',
        toolTip: {
            title: '',
            description: ''
        }
    },
    {
        taskName: 'Test smoke detectors',
        icon: 'fa fa-bell',
        taskDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vi',
        cost: 300,
        dueDate: new Date(),
        status: 'pending',
        reoccuringDue: 'yearly',
        toolTip: {
            title: '',
            description: ''
        }
    },
    {
        taskName: 'Check for leaks',
        icon: 'fa fa-tint',
        taskDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vi',
        cost: 400,
        dueDate: new Date(),
        status: 'pending',
        reoccuringDue: 'monthly',
        toolTip: {
            title: '',
            description: ''
        }
    },
    {
        taskName: 'Check water heater',
        icon: 'fa fa-thermometer',
        taskDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vi',
        cost: 500,
        dueDate: new Date(),
        status: 'failed',
        reoccuringDue: 'yearly',
        toolTip: {
            title: '',
            description: ''
        }
    },
    {
        taskName: 'Check HVAC system',
        icon: 'fa fa-thermometer-half',
        taskDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vi',
        cost: 600,
        dueDate: new Date(),
        status: 'failed',
        reoccuringDue: 'yearly',
        toolTip: {
            title: '',
            description: ''
        }
    },
    {
        taskName: 'Check gutters',
        icon: 'fa fa-tint',
        taskDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vi',
        cost: 700,
        dueDate: new Date(),
        status: 'pending',
        reoccuringDue: 'yearly',
        toolTip: {
            title: '',
            description: ''
        }
    },
    {
        taskName: 'Check roof',
        icon: 'fa fa-tint',
        taskDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vi',
        cost: 800,
        dueDate: new Date(),
        status: 'overdue',
        reoccuringDue: 'yearly',
        toolTip: {
            title: '',
            description: ''
        }
    },
    {
        taskName: 'Check foundation',
        icon: 'fa fa-tint',
        taskDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vi',
        cost: 900,
        dueDate: new Date(),
        status: 'due',
        reoccuringDue: 'yearly',
        toolTip: {
            title: '',
            description: ''
        }
    },
    {
        taskName: 'Check basement',
        icon: 'fa fa-tint',
        taskDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vi',
        cost: 1000,
        dueDate: new Date(),
        status: 'overdue',
        reoccuringDue: 'yearly',
        toolTip: {
            title: '',
            description: ''
        }
    }
];

export const DUMMY_MAINTENANCE_DATA: IMaintenanceItemsProps[] = [
    {
        taskName: 'Plumbing',
        icon: 'fa fa-wrench',
        taskDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vi',
        cost: 100,
        dueDate: new Date(),
        status: 'pending',
        reoccuringDue: 'daily',
        toolTip: {
            title: '',
            description: ''
        }
    },
    {
        taskName: 'Electrical',
        icon: 'fa fa-bolt',
        taskDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vi',
        cost: 200,
        dueDate: new Date(),
        status: 'pending',
        reoccuringDue: 'weekly',
        toolTip: {
            title: '',
            description: ''
        }
    },
    {
        taskName: 'Carpet Cleaning',
        icon: 'fa fa-car',
        taskDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vi',
        cost: 300,
        dueDate: new Date(),
        status: 'pending',
        reoccuringDue: 'monthly',
        toolTip: {
            title: '',
            description: ''
        }
    },
    {
        taskName: 'Painting',
        icon: 'fa fa-paint-brush',
        taskDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vi',
        cost: 400,
        dueDate: new Date(),
        status: 'pending',
        reoccuringDue: 'yearly',
        toolTip: {
            title: '',
            description: ''
        }
    },
    {
        taskName: 'Pest Control',
        icon: 'fa fa-bug',
        taskDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vi',
        cost: 500,
        dueDate: new Date(),
        status: 'pending',
        reoccuringDue: 'daily',
        toolTip: {
            title: '',
            description: ''
        }
    },
    {
        taskName: 'Gardening',
        icon: 'fa fa-leaf',
        taskDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vi',
        cost: 600,
        dueDate: new Date(),
        status: 'pending',
        reoccuringDue: 'daily',
        toolTip: {
            title: '',
            description: ''
        }
    },
    {
        taskName: 'Cleaning',
        icon: 'fa fa-broom',
        taskDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vi',
        cost: 700,
        dueDate: new Date(),
        status: 'pending',
        reoccuringDue: 'daily',
        toolTip: {
            title: '',
            description: ''
        }
    },
    {
        taskName: 'Other',
        icon: 'fa fa-question',
        taskDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vi',
        cost: 800,
        dueDate: new Date(),
        status: 'pending',
        reoccuringDue: 'daily',
        toolTip: {
            title: '',
            description: ''
        }
    },
    {
        taskName: 'Flooring',
        icon: 'fa fa-bolt',
        taskDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vi',
        cost: 900,
        dueDate: new Date(),
        status: 'pending',
        reoccuringDue: 'daily',
        toolTip: {
            title: '',
            description: ''
        }
    }
];

export const DUMMY_COOKING_RECIPE_DATA: ICookingRecipeProps[] = [
    {
        name: 'Chicken Alfredo',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vi',
        author: 'John Doe',
        link: '/1',
        isFavorite: true,
        ingredients: [
        ],
        steps: [

        ]
    },
    {
        name: 'Hotdogs and Macaroni and Cheese',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vi',
        author: 'Forest Gump',
        link: '/3',
        isFavorite: true,
        ingredients: [
        ],
        steps: [

        ]
    },
    {
        name: 'Steak and Potatoes',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vi',
        author: 'John Doe',
        link: '/4',
        isFavorite: false,
        ingredients: [
        ],
        steps: [

        ]
    },
    {
        name: 'Chicken and Rice',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vi',
        author: 'Jane Mason',
        link: '/2',
        isFavorite: false,
        ingredients: [
        ],
        steps: [

        ]
    },
    {
        name: 'Bugers and Fries',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vi',
        author: 'Jane Mason',
        link: '/5',
        isFavorite: true,
        ingredients: [
        ],
        steps: [

        ]
    },
];