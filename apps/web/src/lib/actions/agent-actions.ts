'use server';

import { authCheck } from '@lib/actions/authentication-actions';
import type { QueryConfig } from '@app-types/api';
import { connectToDB } from '@lib/utils';

export const createAgent = async (config: QueryConfig = {}): Promise<any> => {
    const user = await authCheck();

    const createAgentMutation = `
        mutation CreateAgentMutation(
            $name: String!,
            $description: String,
            $config: JSON!,
            $createdBy: UUID!
        ) {
            collection: insertIntoAgentsCollection(objects: [{
                name: $name,
                description: $description,
                config: $config,
                created_by: $createdBy
            }]) {
                records {
                    id
                    name
                    description
                    config
                    created_at
                    updated_at
                    created_by
                }
            }
        }
    `;

    try {
        const [agent] = await connectToDB(createAgentMutation, {
            name: config.data?.config?.name,
            description: config.data?.config?.description,
            config: config.data?.config || {},
            createdBy: user.id
        });

        if (!agent?.id) {
            throw new Error('Failed to create agent');
        }

        // If tools are provided, create tool associations
        if (config.data?.tools?.length) {
            const createAgentToolsMutation = `
                mutation CreateAgentToolsMutation($objects: [AgentToolsInsertInput!]!) {
                    collection: insertIntoAgentToolsCollection(objects: $objects) {
                        records {
                            id
                            agent_id
                            tool_id
                            configuration
                        }
                    }
                }
            `;

            await connectToDB(createAgentToolsMutation, {
                objects: config.data.tools.map((tool: any) => ({
                    agent_id: agent.id,
                    tool_id: tool.id,
                    configuration: tool.configuration || {}
                }))
            });
        }

        return agent;
    } catch (error) {
        console.error('Failed to create agent:', error);
        throw error;
    }
};

export const fetchAgent = async (config: QueryConfig = {}): Promise<any> => {
    const user = await authCheck();

    const fetchAgentQuery = `
        query AgentQuery($agentId: UUID!, $userId: UUID!) {
            collection: agentsCollection(filter: { id: { eq: $agentId }, created_by: { eq: $userId } }) {
                records: edges {
                    agent: node {
                        id
                        name
                        description
                        config
                        created_by
                    }
                }
            }
        }
    `;

    try {
        const [record] = await connectToDB(fetchAgentQuery, {
            id: config.agentId,
            userId: user.id
        });

        if (!record) {
            throw new Error('Agent not found');
        }

        return record.agent;
    } catch (error) {
        console.error('Error fetching agent:', error);
        throw error;
    }
};

export const fetchAgents = async (): Promise<any> => {
    const user = await authCheck();

    const fetchAgentsQuery = `
        query FetchAgentsQuery($userId: UUID!) {
            collection: agentsCollection(filter: { created_by: { eq: $userId } }) {
                records: edges {
                    agent: node {
                        id
                        name
                        description
                        config
                        created_by
                    }
                }
            }
        }
    `;

    try {
        const records = await connectToDB(fetchAgentsQuery, {
            userId: user.id
        });

        return records.map((record: any) => record.agent);
    } catch (error) {
        console.error('Error fetching agents:', error);
        throw error;
    }
};
