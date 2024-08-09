import { request, gql } from 'graphql-request';

// EAS GraphQL endpoint on Base
const graphqlEndpoint = 'https://base-sepolia.easscan.org/graphql';

/**
 * Fetch attestations based on dynamic conditions from EAS.
 * @param {object} where - The conditions for filtering attestations.
 * @returns {object} The list of attestations.
 */
export const getAttestations = async (where) => {
  const query = gql`
    query Attestations($where: AttestationWhereInput) {
      attestations(where: $where) {
        id
      }
    }
  `;

  const variables = {
    where
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

// Example usage
(async () => {
  const whereCondition = {
    txid: {
            equals:"0xC80f52E04f2c1FECf4c6BF8e7a847F7aC266C740"
        }
    };

  const attestations = await getAttestations(whereCondition);
  console.log(attestations);
})();





