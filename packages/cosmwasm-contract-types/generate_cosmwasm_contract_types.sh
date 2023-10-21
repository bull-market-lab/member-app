OUTPUT_DIR="./types"

rm -rf $OUTPUT_DIR

CURRENT_DIR=$(pwd)

MEMBER_CONTRACT_DIR="../../../member-contracts/contracts"

DISTRIBUTION_CONTRACT_NAME=distribution
DISTRIBUTION_CONTRACT_SCHEMA_DIR="$MEMBER_CONTRACT_DIR/$DISTRIBUTION_CONTRACT_NAME/schema"

MEMBER_CONTRACT_NAME=member
MEMBER_CONTRACT_SCHEMA_DIR="$MEMBER_CONTRACT_DIR/$MEMBER_CONTRACT_NAME/schema"

THREAD_CONTRACT_NAME=thread
THREAD_CONTRACT_SCHEMA_DIR="$MEMBER_CONTRACT_DIR/$THREAD_CONTRACT_NAME/schema"

# Generate schema for all contracts
cd $MEMBER_CONTRACT_DIR
cd $DISTRIBUTION_CONTRACT_NAME && cargo schema && cd ..
cd $MEMBER_CONTRACT_NAME && cargo schema && cd ..
cd $THREAD_CONTRACT_NAME && cargo schema && cd ..

# Go back to the current directory
cd $CURRENT_DIR

# Generate distribution contract types
cosmwasm-ts-codegen generate \
    --typesOnly \
    --schema $DISTRIBUTION_CONTRACT_SCHEMA_DIR \
    --out ./types/$DISTRIBUTION_CONTRACT_NAME \
    --name $DISTRIBUTION_CONTRACT_NAME \
    --no-bundle

# Generate member contract types
cosmwasm-ts-codegen generate \
    --typesOnly \
    --schema $MEMBER_CONTRACT_SCHEMA_DIR \
    --out ./types/$MEMBER_CONTRACT_NAME \
    --name $MEMBER_CONTRACT_NAME \
    --no-bundle

# Generate thread contract types
cosmwasm-ts-codegen generate \
    --typesOnly \
    --schema $THREAD_CONTRACT_SCHEMA_DIR \
    --out ./types/$THREAD_CONTRACT_NAME \
    --name $THREAD_CONTRACT_NAME \
    --no-bundle
