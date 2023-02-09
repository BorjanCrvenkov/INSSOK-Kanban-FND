import instance from "../axios/axios";

export const index = async () => {
    const response = await instance.get('workspaces');

    return response.data.data;
};

export const view = async (id) => {
    const response = await instance.get('workspaces/' + id);

    return response.data.data;
};

export const update = async (id, data) => {
    const response = await instance.put('workspaces/' + id, data);

    return response.data.data;
};

export const deleteWorkspace = async (id) => {
    await instance.delete('workspaces/' + id);
};

export const add = async (data) => {
    const response = await instance.post('workspaces', data);

    return response.data.data['id'];
};