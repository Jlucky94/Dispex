import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {AddClientRequest, ClientType, FlatType, HouseType, StreetType} from "api/types";


const baseUrl = "https://dispex.org/api/vtest/"
type ClientTagType = {
    type: 'Client';
    id: number | 'LIST';
};


export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({baseUrl: baseUrl}),
    tagTypes: ['Client'],
    endpoints: (builder) => ({
        getStreets: builder.query<StreetType[], void>({
            query: () => 'Request/streets',
        }),
        getHousesByStreetId: builder.query<HouseType[], number>({
            query: (id) => `Request/houses/${id}`,
        }),
        getHousingStockByHouseId: builder.query<FlatType[], { streetId: number, houseId: number, companyId?: number }>({
            query: (data) => {
                return {
                    url: `HousingStock`,
                    params: {
                        streetId: data.streetId,
                        houseId: data.houseId,
                        companyId: data.companyId
                    }
                }
            },
        }),
        getClientsByAddressId: builder.query<ClientType[], number>({
            query: (id) => ({
                url: "HousingStock/clients",
                params: { addressId: id },
            }),
            providesTags: (_, __, id) => [{ type: 'Client', id }] as ClientTagType[]
        }),
        addClient: builder.mutation<{ id: number, result: string }, AddClientRequest>({
            query: (data) => ({
                url: "HousingStock/client",
                method: "POST",
                body: data,
            }),
        }),
        deleteClient: builder.mutation<void, { clientId:number,addressId:number }>({
            query: (data) => ({
                url: `HousingStock/bind_client/${data.clientId}`,
                method: "DELETE",
            }),
            invalidatesTags:(_, __, { addressId }) => [{ type: 'Client', id: addressId }] as ClientTagType[],
        }),
        bindClient: builder.mutation<void, { addressId: number, clientId: number }>({
            query: (data) => {
                return {
                    url: `HousingStock/bind_client`,
                    method: "PUT",
                    body: data
                }
            },
            invalidatesTags: (_, __, { addressId }) => [{ type: 'Client', id: addressId }] as ClientTagType[],
        })
    }),
});

export const {
    useGetStreetsQuery,
    useGetHousesByStreetIdQuery,
    useGetHousingStockByHouseIdQuery,
    useGetClientsByAddressIdQuery,
    useAddClientMutation,
    useDeleteClientMutation,
    useBindClientMutation
} = api;