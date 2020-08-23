import {hiddenByPermission} from './services/auth';

export default {
  items: [
    {
      name: 'Dashboard',
      url: '/dashboard',
      icon: 'icon-speedometer',
      badge: {
        variant: 'info',
        text: 'NEW',
      },
    },
    {
      title: true,
      name: 'Menu',
      wrapper: {            // optional wrapper object
        element: '',        // required valid HTML5 element tag
        attributes: {}        // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
      },
      class: ''             // optional class names space delimited list for title item ex: "text-center"
    },

    

    {
      name: 'Frete',
      url: '/dashboard/usuario',
      icon: 'icon-check',
      attributes: { hidden: hiddenByPermission('ROLE_ADMIN') },
      badge: {
        variant: 'info',
        text: 'OK',
      },
      children: [
        {
          name: 'Adiantamento',
          url: '/dashboard/usuario/form',
          icon: 'icon-credit-card',
        },
        {
          name: 'Finalização',
          url: '/dashboard/frete/sfc',
          icon: 'icon-credit-card',
        },
      ]
    },

    {
      name: 'Usuário',
      url: '/dashboard/usuario',
      icon: 'icon-user',
      attributes: { hidden: hiddenByPermission('ROLE_ADMIN') },
      badge: {
        variant: 'info',
        text: 'OK',
      },
      children: [
        {
          name: 'Cadastro',
          url: '/dashboard/usuario/form',
          icon: 'icon-user-follow',
        },
        {
          name: 'Listagem',
          url: '/dashboard/usuario/list',
          icon: 'icon-list',
        },
      ]
    },

    // {
    //   name: 'Download CoreUI',
    //   url: 'https://coreui.io/react/',
    //   icon: 'icon-cloud-download',
    //   class: 'mt-auto',
    //   variant: 'danger',
    //   attributes: { target: '_blank', rel: "noopener",hidden: true },
    // },
    
  ],
};
