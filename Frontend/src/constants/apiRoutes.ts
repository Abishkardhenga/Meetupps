// src/constants/apiRoutes.ts

const API_VERSION = "v1"

export const apiRoutes = {
  auth: {
    signup: `/api/${API_VERSION}/auth/register`,
    login: `/api/${API_VERSION}/auth/login`,
    profile: `/api/${API_VERSION}/auth/profile`,
  },

  contacts: {
    create: `/api/${API_VERSION}/contacts/create`,
    list: `/api/${API_VERSION}/contacts/list`,
    view: (contactId: string) => `/api/${API_VERSION}/contacts/view/${contactId}`,
    update: (contactId: string) => `/api/${API_VERSION}/contacts/update/${contactId}`,
    delete: (contactId: string) => `/api/${API_VERSION}/contacts/delete/${contactId}`,
  },

  reminders: {
    create: `/api/${API_VERSION}/reminders/create`,
    list: `/api/${API_VERSION}/reminders/list`,
    checkBirthdays: `/api/${API_VERSION}/reminders/check-events`,
    update: (reminderId: string) => `/api/${API_VERSION}/reminders/update/${reminderId}`,
    delete: (reminderId: string) => `/api/${API_VERSION}/reminders/delete/${reminderId}`,
  },

  gmail: {
    connect: `/api/${API_VERSION}/gmail/connect`,
    sendEmail: `/api/${API_VERSION}/gmail/send-email`,
  },

  ai: {
    generateBirthdayWish: `/api/${API_VERSION}/ai/generate-birthday-wish`,
  },
}
