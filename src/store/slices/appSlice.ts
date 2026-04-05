import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define the base query
const baseQuery = fetchBaseQuery({
  baseUrl: "https://api.financial-dashboard.com", // Replace with your actual API URL
  prepareHeaders: (headers, { getState }: any) => {
    const token = getState()?.auth?.token;

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

// Create an API slice
export const appApi = createApi({
  reducerPath: "appApi",
  baseQuery,
  tagTypes: [
    "User", 
    "Transaction", 
    "Card", 
    "Report", 
    "Statistic", 
    "Notification", 
    "Setting"
  ],
  keepUnusedDataFor: 0,
  endpoints: (builder) => ({
    // User Endpoints
    loadUser: builder.query<any, void>({
      query: () => "/user/profile",
      providesTags: ["User"],
    }),

    updateUserSettings: builder.mutation<any, Partial<any>>({
      query: (settings) => ({
        url: "/user/settings",
        method: "PUT",
        body: settings,
      }),
      invalidatesTags: ["User", "Setting"],
    }),

    // Card Endpoints
    getUserCards: builder.query<any, void>({
      query: () => "/cards",
      providesTags: ["Card"],
    }),

    getCardDetails: builder.query<any, string>({
      query: (cardId) => `/cards/${cardId}`,
      providesTags: (_result, _error, cardId) => [{ type: "Card", id: cardId }],
    }),

    addNewCard: builder.mutation<any, Partial<any>>({
      query: (cardData) => ({
        url: "/cards",
        method: "POST",
        body: cardData,
      }),
      invalidatesTags: ["Card"],
    }),

    // Transaction Endpoints
    getRecentTransactions: builder.query<any, void>({
      query: () => "/transactions/recent",
      providesTags: ["Transaction"],
    }),

    getTransactionById: builder.query<any, string>({
      query: (transactionId) => `/transactions/${transactionId}`,
      providesTags: (_result, _error, transactionId) => [
        { type: "Transaction", id: transactionId },
      ],
    }),

    createTransaction: builder.mutation<any, Partial<any>>({
      query: (transactionData) => ({
        url: "/transactions",
        method: "POST",
        body: transactionData,
      }),
      invalidatesTags: ["Transaction", "Statistic"],
    }),

    // Statistics
    getDashboardStats: builder.query<any, void>({
      query: () => "/stats/dashboard",
      providesTags: ["Statistic"],
    }),

    getMonthlyReport: builder.query<any, { month: string; year: number }>({
      query: ({ month, year }) => `/reports/monthly?month=${month}&year=${year}`,
      providesTags: ["Report"],
    }),

    // Notifications
    getNotifications: builder.query<any, void>({
      query: () => "/notifications",
      providesTags: ["Notification"],
    }),

    markNotificationAsRead: builder.mutation<any, string>({
      query: (notificationId) => ({
        url: `/notifications/${notificationId}/read`,
        method: "PUT",
      }),
      invalidatesTags: ["Notification"],
    }),

    // Settings
    getAppSettings: builder.query<any, void>({
      query: () => "/settings",
      providesTags: ["Setting"],
    }),
  }),
});

export const {
  // User Hooks
  useLoadUserQuery,
  useUpdateUserSettingsMutation,

  // Card Hooks
  useGetUserCardsQuery,
  useGetCardDetailsQuery,
  useAddNewCardMutation,

  // Transaction Hooks
  useGetRecentTransactionsQuery,
  useGetTransactionByIdQuery,
  useCreateTransactionMutation,

  // Statistics Hooks
  useGetDashboardStatsQuery,
  useGetMonthlyReportQuery,

  // Notification Hooks
  useGetNotificationsQuery,
  useMarkNotificationAsReadMutation,

  // Settings Hooks
  useGetAppSettingsQuery,
} = appApi;
