import { request, gql } from 'graphql-request';

// EAS GraphQL endpoint on Base
const graphqlEndpoint = 'https://base-sepolia.easscan.org/graphql';

/**
 * Fetch attestations based on dynamic conditions from EAS.
 * @param {object} where - The conditions for filtering attestations.
 * @returns {object} The list of attestations.
 */
const getAttestations = async (where) => {
    const query = gql`
        query Attestations($where: AttestationWhereInput) {
            attestations(where: $where) {
                id
                recipient
                time
            }
        }
    `;

    const variables = {
        where,
        orderBy: { date: 'desc' }, // Order by time in descending order
        take: 7, // Limit to the first 7 entries
    };

    try {
        const response = await request(graphqlEndpoint, query, variables);
        console.log('Attestations:', response.attestations);
        return response.attestations;
    } catch (error) {
        console.error('Error fetching attestations:', error);
        throw error;
    }
};

/**
 * Function to fetch and log attestations based on a given condition.
 * @param {object} whereCondition - The condition for filtering attestations.
 */
export const fetchAndLogAttestations = async (whereCondition) => {
    try {
        const attestations = await getAttestations(whereCondition);
        console.log(attestations);
        return attestations;
    } catch (error) {
        console.error('Error in fetchAndLogAttestations:', error);
    }
};

export const fetchTotalData = async (whereCondition) => {
    try {
        const totalData = await getAttestations(whereCondition);
        console.log(totalData);
        return totalData;
    } catch (error) {
        console.error('Error in fetchAndLogAttestations:', error);
    }
};
