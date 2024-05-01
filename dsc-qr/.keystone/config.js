"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// keystone.ts
var keystone_exports = {};
__export(keystone_exports, {
  default: () => keystone_default
});
module.exports = __toCommonJS(keystone_exports);
var import_core2 = require("@keystone-6/core");

// schema.ts
var import_core = require("@keystone-6/core");
var import_access = require("@keystone-6/core/access");
var import_fields = require("@keystone-6/core/fields");
var lists = {
  User: (0, import_core.list)({
    // WARNING
    //   for this starter project, anyone can create, query, update and delete anything
    //   if you want to prevent random people on the internet from accessing your data,
    //   you can find out more at https://keystonejs.com/docs/guides/auth-and-access-control
    access: import_access.allowAll,
    // this is the fields for our User list
    fields: {
      // by adding isRequired, we enforce that every User should have a name
      //   if no name is provided, an error will be displayed
      name: (0, import_fields.text)({ validation: { isRequired: true }, isIndexed: "unique" }),
      password: (0, import_fields.password)({ validation: { isRequired: true } }),
      createdAt: (0, import_fields.timestamp)({
        // this sets the timestamp to Date.now() when the user is first created
        defaultValue: { kind: "now" }
      })
    }
  }),
  Survey: (0, import_core.list)({
    access: import_access.allowAll,
    fields: {
      name: (0, import_fields.virtual)({
        field: import_core.graphql.field({
          type: import_core.graphql.String,
          resolve: (data) => data.form && JSON.parse(data.form).title
        }),
        ui: {
          itemView: {
            fieldMode: "read",
            fieldPosition: "sidebar"
          }
        }
      }),
      form: (0, import_fields.json)({
        ui: {
          views: "./survey-creator"
        }
      }),
      link: (0, import_fields.virtual)({
        field: import_core.graphql.field({
          type: import_core.graphql.String,
          resolve: (item) => `http://localhost:3001/${item.id}`
          // for now
        }),
        label: "QR Code",
        ui: {
          views: "./qr-code",
          itemView: {
            fieldPosition: "sidebar",
            fieldMode: "read"
          },
          createView: {
            fieldMode: "hidden"
          },
          listView: {
            fieldMode: "hidden"
          }
        }
      }),
      submissions: (0, import_fields.relationship)({
        ref: "Submission.survey",
        many: true,
        ui: {
          displayMode: "count"
        }
      })
    }
  }),
  Submission: (0, import_core.list)({
    access: import_access.allowAll,
    ui: {
      labelField: "createdAt"
    },
    fields: {
      survey: (0, import_fields.relationship)({ ref: "Survey.submissions" }),
      response: (0, import_fields.json)(),
      createdAt: (0, import_fields.timestamp)({
        defaultValue: { kind: "now" },
        ui: {
          itemView: {
            fieldMode: "read",
            fieldPosition: "sidebar"
          }
        }
      })
    }
  })
};

// auth.ts
var import_crypto = require("crypto");
var import_auth = require("@keystone-6/auth");
var import_session = require("@keystone-6/core/session");
var sessionSecret = process.env.SESSION_SECRET;
if (!sessionSecret && process.env.NODE_ENV !== "production") {
  sessionSecret = (0, import_crypto.randomBytes)(32).toString("hex");
}
var { withAuth } = (0, import_auth.createAuth)({
  listKey: "User",
  identityField: "name",
  // this is a GraphQL query fragment for fetching what data will be attached to a context.session
  //   this can be helpful for when you are writing your access control functions
  //   you can find out more at https://keystonejs.com/docs/guides/auth-and-access-control
  sessionData: "name createdAt",
  secretField: "password",
  // WARNING: remove initFirstItem functionality in production
  //   see https://keystonejs.com/docs/config/auth#init-first-item for more
  initFirstItem: {
    // if there are no items in the database, by configuring this field
    //   you are asking the Keystone AdminUI to create a new user
    //   providing inputs for these fields
    fields: ["name", "password"]
    // it uses context.sudo() to do this, which bypasses any access control you might have
    //   you shouldn't use this in production
  }
});
var sessionMaxAge = 60 * 60 * 24 * 30;
var session = (0, import_session.statelessSessions)({
  maxAge: sessionMaxAge,
  secret: sessionSecret
});

// keystone.ts
var keystone_default = withAuth(
  (0, import_core2.config)({
    db: {
      // we're using sqlite for the fastest startup experience
      //   for more information on what database might be appropriate for you
      //   see https://keystonejs.com/docs/guides/choosing-a-database#title
      provider: "sqlite",
      url: "file:./keystone.db"
    },
    lists,
    session,
    server: {
      cors: {
        origin: ["http://localhost:3001"]
      }
    }
  })
);
//# sourceMappingURL=config.js.map
