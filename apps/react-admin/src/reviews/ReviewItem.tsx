import * as React from 'react';
import { Fragment } from 'react';
import { ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import {
    useCreatePath,
    ReferenceField,
    FunctionField,
    Link,
    TextField,
    useRecordContext,
} from 'react-admin';

import AvatarField from '../visitors/AvatarField';
import { Review, Customer } from '../types';

export const ReviewItem = () => {
    const record = useRecordContext<Review>();
    const createPath = useCreatePath();
    if (!record) {
        return null;
    }
    return (
        <Link
            to={createPath({
                resource: 'reviews',
                type: 'edit',
                id: record.id,
            })}
            underline="none"
            color="inherit"
        >
            <ListItem button>
                <ListItemAvatar>
                    <ReferenceField
                        source="customer_id"
                        reference="customers"
                        link={false}
                    >
                        <AvatarField size="40" />
                    </ReferenceField>
                </ListItemAvatar>
                <ListItemText
                    primary={
                        <Fragment>
                            <ReferenceField
                                source="customer_id"
                                reference="customers"
                                link={false}
                            >
                                <FunctionField<Customer>
                                    render={record =>
                                        record
                                            ? `${record.first_name} ${record.last_name}`
                                            : ''
                                    }
                                    variant="subtitle1"
                                />
                            </ReferenceField>{' '}
                            on{' '}
                            <ReferenceField
                                source="product_id"
                                reference="products"
                                link={false}
                            >
                                <TextField
                                    source="reference"
                                    variant="subtitle1"
                                />
                            </ReferenceField>
                        </Fragment>
                    }
                    secondary={record.comment}
                    secondaryTypographyProps={{ noWrap: true }}
                />
            </ListItem>
        </Link>
    );
};
