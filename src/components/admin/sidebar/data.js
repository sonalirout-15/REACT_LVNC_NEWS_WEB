export const Data = {
    menus: [{
            header: true,
            name: 'Dashboard'
        },
        {
            name: 'Dashboard',
            icon: 'fas fa-fire',
            url : '/dashboard'
        },
        {
            name: 'Admins',
            icon: 'far fa-user',
            url: '/admins',
        },
        {
            name: 'Categories',
            icon: 'fas fa-th-large',
            url: '/categories',
        },
        {
            name: 'Subcategories',
            icon: 'fa fa-list-alt',
            url: '/subcategories',
        },
        {
            name: 'Matters',
            icon: 'fas fa-newspaper',
            url: '/matters',
        },
        {
          
            name: 'Post',
            icon: 'fas fa-print',
            url: '/post',
        },
        {
            name: 'Campaign',
            icon: 'fas fa-poll',
            url: '/campaign',
        },
        {
            name: 'Banner Image',
            icon: 'fas fa-poll',
            url: '/banner',
        },
        {
            name: 'Latest News',
            icon: 'fas fa-newspaper',
            url: '/latestnews',
        },
        {
            dropdown: true,
            active: false,
            name: 'Users',
            icon: 'far fa-user',
            children: [{
                    name: 'User List',
                    url: '/users/userList',
                    active: false
                },
                {
                    name: 'Contact List',
                    icon: 'fas fa-phone',
                    url: '/users/contactUs',
                },
            ]
        },
    ]
};