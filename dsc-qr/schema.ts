// Welcome to your schema
//   Schema driven development is Keystone's modus operandi
//
// This file is where we define the lists, fields and hooks for our data.
// If you want to learn more about how lists are configured, please read
// - https://keystonejs.com/docs/config/lists

import {graphql, list} from '@keystone-6/core';
import {allowAll} from '@keystone-6/core/access';

// see https://keystonejs.com/docs/fields/overview for the full list of fields
//   this is a few common fields for an example
import {json, password, relationship, text, timestamp, virtual,} from '@keystone-6/core/fields';

// the document field is a more complicated field, so it has it's own package
// if you want to make your own fields, see https://keystonejs.com/docs/guides/custom-fields
// when using Typescript, you can refine your types to a stricter subset by importing
// the generated types from '.keystone/types'
import type {Lists} from '.keystone/types';

export const lists: Lists = {
    User: list({
        // WARNING
        //   for this starter project, anyone can create, query, update and delete anything
        //   if you want to prevent random people on the internet from accessing your data,
        //   you can find out more at https://keystonejs.com/docs/guides/auth-and-access-control
        access: allowAll,

        // this is the fields for our User list
        fields: {
            // by adding isRequired, we enforce that every User should have a name
            //   if no name is provided, an error will be displayed
            name: text({validation: {isRequired: true}, isIndexed: 'unique'}),

            password: password({validation: {isRequired: true}}),

            createdAt: timestamp({
                // this sets the timestamp to Date.now() when the user is first created
                defaultValue: {kind: 'now'},
            }),
        },
    }),
    Survey: list({
        access: allowAll,
        fields: {
            name: virtual({
                field: graphql.field({
                    type: graphql.String,
                    resolve: (data) => {
                        if (data.form) {
                            const title = JSON.parse(data.form).title;
                            return typeof title === 'string'
                                ? title : title && 'default' in title
                                    ? title.default : "";
                        } else {
                            return ""
                        }
                    }
                }),
                ui: {
                    itemView: {
                        fieldMode: 'read',
                        fieldPosition: 'sidebar'
                    }
                }
            }),
            form: json({
                ui: {
                    views: './survey-creator'
                }
            }),
            link: virtual({
                field: graphql.field({
                    type: graphql.String,
                    resolve: item => `http://localhost:3001/${item.id}` // for now
                }),
                label: 'QR Code',
                ui: {
                    views: './qr-code',
                    itemView: {
                        fieldPosition: 'sidebar',
                        fieldMode: 'read'
                    },
                    createView: {
                        fieldMode: 'hidden'
                    },
                    listView: {
                        fieldMode: 'hidden'
                    }
                }
            }),
            submissions: relationship({
                ref: 'Submission.survey',
                many: true,
                ui: {
                    displayMode: 'count'
                }
            }),
        }
    }),
    Submission: list({
        access: allowAll,
        ui: {
            labelField: 'createdAt'
        },
        fields: {
            survey: relationship({ref: 'Survey.submissions'}),
            response: json(),
            createdAt: timestamp({
                defaultValue: {kind: 'now'}, ui: {
                    itemView: {
                        fieldMode: 'read',
                        fieldPosition: 'sidebar'
                    }
                }
            })
        }
    })
};
