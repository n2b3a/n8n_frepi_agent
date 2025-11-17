Información de tablas en supabase:

#  **1\. Tablas y Columnas**

\[  
  {  
    "table\_name": "line\_sessions",  
    "column\_name": "session\_id",  
    "data\_type": "character varying",  
    "udt\_name": "varchar",  
    "character\_maximum\_length": 100,  
    "is\_nullable": "NO",  
    "column\_default": null,  
    "column\_comment": null  
  },  
  {  
    "table\_name": "line\_sessions",  
    "column\_name": "restaurant\_id",  
    "data\_type": "integer",  
    "udt\_name": "int4",  
    "character\_maximum\_length": null,  
    "is\_nullable": "YES",  
    "column\_default": null,  
    "column\_comment": null  
  },  
  {  
    "table\_name": "line\_sessions",  
    "column\_name": "person\_id",  
    "data\_type": "integer",  
    "udt\_name": "int4",  
    "character\_maximum\_length": null,  
    "is\_nullable": "YES",  
    "column\_default": null,  
    "column\_comment": null  
  },  
  {  
    "table\_name": "line\_sessions",  
    "column\_name": "parent\_session\_id",  
    "data\_type": "character varying",  
    "udt\_name": "varchar",  
    "character\_maximum\_length": 100,  
    "is\_nullable": "YES",  
    "column\_default": null,  
    "column\_comment": null  
  },  
  {  
    "table\_name": "line\_sessions",  
    "column\_name": "channel\_type",  
    "data\_type": "USER-DEFINED",  
    "udt\_name": "channel\_type\_enum",  
    "character\_maximum\_length": null,  
    "is\_nullable": "YES",  
    "column\_default": null,  
    "column\_comment": null  
  },  
  {  
    "table\_name": "line\_sessions",  
    "column\_name": "channel\_id",  
    "data\_type": "character varying",  
    "udt\_name": "varchar",  
    "character\_maximum\_length": 100,  
    "is\_nullable": "YES",  
    "column\_default": null,  
    "column\_comment": null  
  },  
  {  
    "table\_name": "line\_sessions",  
    "column\_name": "platform\_session\_id",  
    "data\_type": "character varying",  
    "udt\_name": "varchar",  
    "character\_maximum\_length": 255,  
    "is\_nullable": "YES",  
    "column\_default": null,  
    "column\_comment": null  
  },  
  {  
    "table\_name": "line\_sessions",  
    "column\_name": "session\_start",  
    "data\_type": "timestamp with time zone",  
    "udt\_name": "timestamptz",  
    "character\_maximum\_length": null,  
    "is\_nullable": "YES",  
    "column\_default": "now()",  
    "column\_comment": null  
  },  
  {  
    "table\_name": "line\_sessions",  
    "column\_name": "session\_end",  
    "data\_type": "timestamp with time zone",  
    "udt\_name": "timestamptz",  
    "character\_maximum\_length": null,  
    "is\_nullable": "YES",  
    "column\_default": null,  
    "column\_comment": null  
  },  
  {  
    "table\_name": "line\_sessions",  
    "column\_name": "duration\_minutes",  
    "data\_type": "integer",  
    "udt\_name": "int4",  
    "character\_maximum\_length": null,  
    "is\_nullable": "YES",  
    "column\_default": null,  
    "column\_comment": null  
  },  
  {  
    "table\_name": "line\_sessions",  
    "column\_name": "last\_activity\_at",  
    "data\_type": "timestamp with time zone",  
    "udt\_name": "timestamptz",  
    "character\_maximum\_length": null,  
    "is\_nullable": "YES",  
    "column\_default": "now()",  
    "column\_comment": null  
  },  
  {  
    "table\_name": "line\_sessions",  
    "column\_name": "message\_count",  
    "data\_type": "integer",  
    "udt\_name": "int4",  
    "character\_maximum\_length": null,  
    "is\_nullable": "YES",  
    "column\_default": "0",  
    "column\_comment": null  
  },  
  {  
    "table\_name": "line\_sessions",  
    "column\_name": "user\_messages",  
    "data\_type": "integer",  
    "udt\_name": "int4",  
    "character\_maximum\_length": null,  
    "is\_nullable": "YES",  
    "column\_default": "0",  
    "column\_comment": null  
  },  
  {  
    "table\_name": "line\_sessions",  
    "column\_name": "bot\_messages",  
    "data\_type": "integer",  
    "udt\_name": "int4",  
    "character\_maximum\_length": null,  
    "is\_nullable": "YES",  
    "column\_default": "0",  
    "column\_comment": null  
  },  
  {  
    "table\_name": "line\_sessions",  
    "column\_name": "response\_time\_avg",  
    "data\_type": "integer",  
    "udt\_name": "int4",  
    "character\_maximum\_length": null,  
    "is\_nullable": "YES",  
    "column\_default": null,  
    "column\_comment": null  
  },  
  {  
    "table\_name": "line\_sessions",  
    "column\_name": "session\_complexity",  
    "data\_type": "USER-DEFINED",  
    "udt\_name": "session\_complexity\_enum",  
    "character\_maximum\_length": null,  
    "is\_nullable": "YES",  
    "column\_default": null,  
    "column\_comment": null  
  },  
  {  
    "table\_name": "line\_sessions",  
    "column\_name": "inquiry\_type",  
    "data\_type": "USER-DEFINED",  
    "udt\_name": "inquiry\_type\_enum",  
    "character\_maximum\_length": null,  
    "is\_nullable": "YES",  
    "column\_default": null,  
    "column\_comment": null  
  },  
  {  
    "table\_name": "line\_sessions",  
    "column\_name": "primary\_intent",  
    "data\_type": "character varying",  
    "udt\_name": "varchar",  
    "character\_maximum\_length": 100,  
    "is\_nullable": "YES",  
    "column\_default": null,  
    "column\_comment": null  
  },  
  {  
    "table\_name": "line\_sessions",  
    "column\_name": "products\_discussed",  
    "data\_type": "jsonb",  
    "udt\_name": "jsonb",  
    "character\_maximum\_length": null,  
    "is\_nullable": "YES",  
    "column\_default": null,  
    "column\_comment": null  
  },  
  {  
    "table\_name": "line\_sessions",  
    "column\_name": "suppliers\_mentioned",  
    "data\_type": "jsonb",  
    "udt\_name": "jsonb",  
    "character\_maximum\_length": null,  
    "is\_nullable": "YES",  
    "column\_default": null,  
    "column\_comment": null  
  },  
  {  
    "table\_name": "line\_sessions",  
    "column\_name": "categories\_explored",  
    "data\_type": "jsonb",  
    "udt\_name": "jsonb",  
    "character\_maximum\_length": null,  
    "is\_nullable": "YES",  
    "column\_default": null,  
    "column\_comment": null  
  },  
  {  
    "table\_name": "line\_sessions",  
    "column\_name": "ai\_model\_version",  
    "data\_type": "character varying",  
    "udt\_name": "varchar",  
    "character\_maximum\_length": 50,  
    "is\_nullable": "YES",  
    "column\_default": null,  
    "column\_comment": null  
  },  
  {  
    "table\_name": "line\_sessions",  
    "column\_name": "total\_ai\_calls",  
    "data\_type": "integer",  
    "udt\_name": "int4",  
    "character\_maximum\_length": null,  
    "is\_nullable": "YES",  
    "column\_default": "0",  
    "column\_comment": null  
  },  
  {  
    "table\_name": "line\_sessions",  
    "column\_name": "embeddings\_used",  
    "data\_type": "integer",  
    "udt\_name": "int4",  
    "character\_maximum\_length": null,  
    "is\_nullable": "YES",  
    "column\_default": "0",  
    "column\_comment": null  
  },  
  {  
    "table\_name": "line\_sessions",  
    "column\_name": "recommendations\_made",  
    "data\_type": "integer",  
    "udt\_name": "int4",  
    "character\_maximum\_length": null,  
    "is\_nullable": "YES",  
    "column\_default": "0",  
    "column\_comment": null  
  },  
  {  
    "table\_name": "line\_sessions",  
    "column\_name": "recommendations\_accepted",  
    "data\_type": "integer",  
    "udt\_name": "int4",  
    "character\_maximum\_length": null,  
    "is\_nullable": "YES",  
    "column\_default": "0",  
    "column\_comment": null  
  },  
  {  
    "table\_name": "line\_sessions",  
    "column\_name": "dominant\_language",  
    "data\_type": "character varying",  
    "udt\_name": "varchar",  
    "character\_maximum\_length": 10,  
    "is\_nullable": "YES",  
    "column\_default": null,  
    "column\_comment": null  
  },  
  {  
    "table\_name": "line\_sessions",  
    "column\_name": "sentiment\_overall",  
    "data\_type": "USER-DEFINED",  
    "udt\_name": "sentiment\_enum",  
    "character\_maximum\_length": null,  
    "is\_nullable": "YES",  
    "column\_default": null,  
    "column\_comment": null  
  },  
  {  
    "table\_name": "line\_sessions",  
    "column\_name": "sentiment\_scores",  
    "data\_type": "jsonb",  
    "udt\_name": "jsonb",  
    "character\_maximum\_length": null,  
    "is\_nullable": "YES",  
    "column\_default": null,  
    "column\_comment": null  
  },  
  {  
    "table\_name": "line\_sessions",  
    "column\_name": "emotion\_detected",  
    "data\_type": "jsonb",  
    "udt\_name": "jsonb",  
    "character\_maximum\_length": null,  
    "is\_nullable": "YES",  
    "column\_default": null,  
    "column\_comment": null  
  },  
  {  
    "table\_name": "line\_sessions",  
    "column\_name": "urgency\_level",  
    "data\_type": "USER-DEFINED",  
    "udt\_name": "urgency\_level\_enum",  
    "character\_maximum\_length": null,  
    "is\_nullable": "YES",  
    "column\_default": null,  
    "column\_comment": null  
  },  
  {  
    "table\_name": "line\_sessions",  
    "column\_name": "preferences\_captured",  
    "data\_type": "jsonb",  
    "udt\_name": "jsonb",  
    "character\_maximum\_length": null,  
    "is\_nullable": "YES",  
    "column\_default": null,  
    "column\_comment": null  
  },  
  {  
    "table\_name": "line\_sessions",  
    "column\_name": "new\_preferences",  
    "data\_type": "jsonb",  
    "udt\_name": "jsonb",  
    "character\_maximum\_length": null,  
    "is\_nullable": "YES",  
    "column\_default": null,  
    "column\_comment": null  
  },  
  {  
    "table\_name": "line\_sessions",  
    "column\_name": "preference\_confidence",  
    "data\_type": "jsonb",  
    "udt\_name": "jsonb",  
    "character\_maximum\_length": null,  
    "is\_nullable": "YES",  
    "column\_default": null,  
    "column\_comment": null  
  },  
  {  
    "table\_name": "line\_sessions",  
    "column\_name": "behavioral\_signals",  
    "data\_type": "jsonb",  
    "udt\_name": "jsonb",  
    "character\_maximum\_length": null,  
    "is\_nullable": "YES",  
    "column\_default": null,  
    "column\_comment": null  
  },  
  {  
    "table\_name": "line\_sessions",  
    "column\_name": "learning\_opportunities",  
    "data\_type": "jsonb",  
    "udt\_name": "jsonb",  
    "character\_maximum\_length": null,  
    "is\_nullable": "YES",  
    "column\_default": null,  
    "column\_comment": null  
  },  
  {  
    "table\_name": "line\_sessions",  
    "column\_name": "session\_goal\_achieved",  
    "data\_type": "boolean",  
    "udt\_name": "bool",  
    "character\_maximum\_length": null,  
    "is\_nullable": "YES",  
    "column\_default": null,  
    "column\_comment": null  
  },  
  {  
    "table\_name": "line\_sessions",  
    "column\_name": "conversion\_occurred",  
    "data\_type": "boolean",  
    "udt\_name": "bool",  
    "character\_maximum\_length": null,  
    "is\_nullable": "YES",  
    "column\_default": "false",  
    "column\_comment": null  
  },  
  {  
    "table\_name": "line\_sessions",  
    "column\_name": "order\_value",  
    "data\_type": "numeric",  
    "udt\_name": "numeric",  
    "character\_maximum\_length": null,  
    "is\_nullable": "YES",  
    "column\_default": null,  
    "column\_comment": null  
  },  
  {  
    "table\_name": "line\_sessions",  
    "column\_name": "satisfaction\_level",  
    "data\_type": "numeric",  
    "udt\_name": "numeric",  
    "character\_maximum\_length": null,  
    "is\_nullable": "YES",  
    "column\_default": null,  
    "column\_comment": null  
  },  
  {  
    "table\_name": "line\_sessions",  
    "column\_name": "resolution\_status",  
    "data\_type": "USER-DEFINED",  
    "udt\_name": "resolution\_status\_enum",  
    "character\_maximum\_length": null,  
    "is\_nullable": "YES",  
    "column\_default": null,  
    "column\_comment": null  
  },  
  {  
    "table\_name": "line\_sessions",  
    "column\_name": "follow\_up\_required",  
    "data\_type": "boolean",  
    "udt\_name": "bool",  
    "character\_maximum\_length": null,  
    "is\_nullable": "YES",  
    "column\_default": "false",  
    "column\_comment": null  
  },  
  {  
    "table\_name": "line\_sessions",  
    "column\_name": "follow\_up\_type",  
    "data\_type": "USER-DEFINED",  
    "udt\_name": "follow\_up\_type\_enum",  
    "character\_maximum\_length": null,  
    "is\_nullable": "YES",  
    "column\_default": null,  
    "column\_comment": null  
  },  
  {  
    "table\_name": "line\_sessions",  
    "column\_name": "follow\_up\_scheduled\_at",  
    "data\_type": "timestamp with time zone",  
    "udt\_name": "timestamptz",  
    "character\_maximum\_length": null,  
    "is\_nullable": "YES",  
    "column\_default": null,  
    "column\_comment": null  
  },  
  {  
    "table\_name": "line\_sessions",  
    "column\_name": "follow\_up\_completed",  
    "data\_type": "boolean",  
    "udt\_name": "bool",  
    "character\_maximum\_length": null,  
    "is\_nullable": "YES",  
    "column\_default": "false",  
    "column\_comment": null  
  },  
  {  
    "table\_name": "line\_sessions",  
    "column\_name": "session\_type",  
    "data\_type": "USER-DEFINED",  
    "udt\_name": "session\_type\_enum",  
    "character\_maximum\_length": null,  
    "is\_nullable": "YES",  
    "column\_default": null,  
    "column\_comment": null  
  },  
  {  
    "table\_name": "line\_sessions",  
    "column\_name": "learning\_value",  
    "data\_type": "numeric",  
    "udt\_name": "numeric",  
    "character\_maximum\_length": null,  
    "is\_nullable": "YES",  
    "column\_default": null,  
    "column\_comment": null  
  },  
  {  
    "table\_name": "line\_sessions",  
    "column\_name": "pattern\_match",  
    "data\_type": "jsonb",  
    "udt\_name": "jsonb",  
    "character\_maximum\_length": null,  
    "is\_nullable": "YES",  
    "column\_default": null,  
    "column\_comment": null  
  },  
  {  
    "table\_name": "line\_sessions",  
    "column\_name": "anomalies\_detected",  
    "data\_type": "jsonb",  
    "udt\_name": "jsonb",  
    "character\_maximum\_length": null,  
    "is\_nullable": "YES",  
    "column\_default": null,  
    "column\_comment": null  
  },  
  {  
    "table\_name": "line\_sessions",  
    "column\_name": "improvement\_suggestions",  
    "data\_type": "jsonb",  
    "udt\_name": "jsonb",  
    "character\_maximum\_length": null,  
    "is\_nullable": "YES",  
    "column\_default": null,  
    "column\_comment": null  
  },  
  {  
    "table\_name": "line\_sessions",  
    "column\_name": "escalation\_required",  
    "data\_type": "boolean",  
    "udt\_name": "bool",  
    "character\_maximum\_length": null,  
    "is\_nullable": "YES",  
    "column\_default": "false",  
    "column\_comment": null  
  },  
  {  
    "table\_name": "line\_sessions",  
    "column\_name": "escalation\_reason",  
    "data\_type": "text",  
    "udt\_name": "text",  
    "character\_maximum\_length": null,  
    "is\_nullable": "YES",  
    "column\_default": null,  
    "column\_comment": null  
  },  
  {  
    "table\_name": "line\_sessions",  
    "column\_name": "escalated\_to",  
    "data\_type": "character varying",  
    "udt\_name": "varchar",  
    "character\_maximum\_length": 100,  
    "is\_nullable": "YES",  
    "column\_default": null,  
    "column\_comment": null  
  },  
  {  
    "table\_name": "line\_sessions",  
    "column\_name": "escalation\_resolved",  
    "data\_type": "boolean",  
    "udt\_name": "bool",  
    "character\_maximum\_length": null,  
    "is\_nullable": "YES",  
    "column\_default": "false",  
    "column\_comment": null  
  },  
  {  
    "table\_name": "line\_sessions",  
    "column\_name": "created\_at",  
    "data\_type": "timestamp with time zone",  
    "udt\_name": "timestamptz",  
    "character\_maximum\_length": null,  
    "is\_nullable": "YES",  
    "column\_default": "now()",  
    "column\_comment": null  
  },  
  {  
    "table\_name": "line\_sessions",  
    "column\_name": "updated\_at",  
    "data\_type": "timestamp with time zone",  
    "udt\_name": "timestamptz",  
    "character\_maximum\_length": null,  
    "is\_nullable": "YES",  
    "column\_default": "now()",  
    "column\_comment": null  
  },  
  {  
    "table\_name": "line\_sessions",  
    "column\_name": "session\_notes",  
    "data\_type": "text",  
    "udt\_name": "text",  
    "character\_maximum\_length": null,  
    "is\_nullable": "YES",  
    "column\_default": null,  
    "column\_comment": null  
  },  
  {  
    "table\_name": "line\_sessions",  
    "column\_name": "internal\_tags",  
    "data\_type": "jsonb",  
    "udt\_name": "jsonb",  
    "character\_maximum\_length": null,  
    "is\_nullable": "YES",  
    "column\_default": null,  
    "column\_comment": null  
  },  
  {  
    "table\_name": "line\_sessions",  
    "column\_name": "quality\_score",  
    "data\_type": "numeric",  
    "udt\_name": "numeric",  
    "character\_maximum\_length": null,  
    "is\_nullable": "YES",  
    "column\_default": null,  
    "column\_comment": null  
  },  
  {  
    "table\_name": "line\_sessions",  
    "column\_name": "awaiting\_continuation",  
    "data\_type": "boolean",  
    "udt\_name": "bool",  
    "character\_maximum\_length": null,  
    "is\_nullable": "YES",  
    "column\_default": "false",  
    "column\_comment": null  
  },  
  {  
    "table\_name": "line\_sessions",  
    "column\_name": "continuation\_timestamp",  
    "data\_type": "timestamp without time zone",  
    "udt\_name": "timestamp",  
    "character\_maximum\_length": null,  
    "is\_nullable": "YES",  
    "column\_default": null,  
    "column\_comment": null  
  },  
  {  
    "table\_name": "master\_list",  
    "column\_name": "id",  
    "data\_type": "bigint",  
    "udt\_name": "int8",  
    "character\_maximum\_length": null,  
    "is\_nullable": "NO",  
    "column\_default": "nextval('master\_list\_id\_seq'::regclass)",  
    "column\_comment": null  
  },  
  {  
    "table\_name": "master\_list",  
    "column\_name": "product\_name",  
    "data\_type": "character varying",  
    "udt\_name": "varchar",  
    "character\_maximum\_length": 255,  
    "is\_nullable": "NO",  
    "column\_default": null,  
    "column\_comment": null  
  },  
  {  
    "table\_name": "master\_list",  
    "column\_name": "product\_description",  
    "data\_type": "text",  
    "udt\_name": "text",  
    "character\_maximum\_length": null,  
    "is\_nullable": "YES",  
    "column\_default": null,  
    "column\_comment": null  
  },  
  {  
    "table\_name": "master\_list",  
    "column\_name": "brand",  
    "data\_type": "character varying",  
    "udt\_name": "varchar",  
    "character\_maximum\_length": 255,  
    "is\_nullable": "YES",  
    "column\_default": null,  
    "column\_comment": null  
  },  
  {  
    "table\_name": "master\_list",  
    "column\_name": "barcode\_ean",  
    "data\_type": "character varying",  
    "udt\_name": "varchar",  
    "character\_maximum\_length": 50,  
    "is\_nullable": "YES",  
    "column\_default": null,  
    "column\_comment": null  
  },  
  {  
    "table\_name": "master\_list",  
    "column\_name": "base\_category\_id",  
    "data\_type": "integer",  
    "udt\_name": "int4",  
    "character\_maximum\_length": null,  
    "is\_nullable": "YES",  
    "column\_default": null,  
    "column\_comment": null  
  },  
  {  
    "table\_name": "master\_list",  
    "column\_name": "product\_category\_id",  
    "data\_type": "integer",  
    "udt\_name": "int4",  
    "character\_maximum\_length": null,  
    "is\_nullable": "YES",  
    "column\_default": null,  
    "column\_comment": null  
  },  
  {  
    "table\_name": "master\_list",  
    "column\_name": "product\_tags",  
    "data\_type": "jsonb",  
    "udt\_name": "jsonb",  
    "character\_maximum\_length": null,  
    "is\_nullable": "YES",  
    "column\_default": null,  
    "column\_comment": null  
  },  
  {  
    "table\_name": "master\_list",  
    "column\_name": "embedding\_vector",  
    "data\_type": "jsonb",  
    "udt\_name": "jsonb",  
    "character\_maximum\_length": null,  
    "is\_nullable": "YES",  
    "column\_default": null,  
    "column\_comment": null  
  },  
  {  
    "table\_name": "master\_list",  
    "column\_name": "embedding\_version",  
    "data\_type": "character varying",  
    "udt\_name": "varchar",  
    "character\_maximum\_length": 50,  
    "is\_nullable": "YES",  
    "column\_default": null,  
    "column\_comment": null  
  },  
  {  
    "table\_name": "master\_list",  
    "column\_name": "embedding\_created\_at",  
    "data\_type": "timestamp with time zone",  
    "udt\_name": "timestamptz",  
    "character\_maximum\_length": null,  
    "is\_nullable": "YES",  
    "column\_default": null,  
    "column\_comment": null  
  },  
  {  
    "table\_name": "master\_list",  
    "column\_name": "search\_frequency",  
    "data\_type": "integer",  
    "udt\_name": "int4",  
    "character\_maximum\_length": null,  
    "is\_nullable": "YES",  
    "column\_default": "0",  
    "column\_comment": null  
  },  
  {  
    "table\_name": "master\_list",  
    "column\_name": "match\_confidence\_avg",  
    "data\_type": "numeric",  
    "udt\_name": "numeric",  
    "character\_maximum\_length": null,  
    "is\_nullable": "YES",  
    "column\_default": null,  
    "column\_comment": null  
  },  
  {  
    "table\_name": "master\_list",  
    "column\_name": "alternative\_names",  
    "data\_type": "jsonb",  
    "udt\_name": "jsonb",  
    "character\_maximum\_length": null,  
    "is\_nullable": "YES",  
    "column\_default": null,  
    "column\_comment": null  
  },  
  {  
    "table\_name": "master\_list",  
    "column\_name": "synonym\_variations",  
    "data\_type": "jsonb",  
    "udt\_name": "jsonb",  
    "character\_maximum\_length": null,  
    "is\_nullable": "YES",  
    "column\_default": null,  
    "column\_comment": null  
  },  
  {  
    "table\_name": "master\_list",  
    "column\_name": "common\_misspellings",  
    "data\_type": "jsonb",  
    "udt\_name": "jsonb",  
    "character\_maximum\_length": null,  
    "is\_nullable": "YES",  
    "column\_default": null,  
    "column\_comment": null  
  },  
  {  
    "table\_name": "master\_list",  
    "column\_name": "quality\_tier",  
    "data\_type": "USER-DEFINED",  
    "udt\_name": "quality\_tier\_enum",  
    "character\_maximum\_length": null,  
    "is\_nullable": "YES",  
    "column\_default": null,  
    "column\_comment": null  
  },  
  {  
    "table\_name": "master\_list",  
    "column\_name": "specifications",  
    "data\_type": "jsonb",  
    "udt\_name": "jsonb",  
    "character\_maximum\_length": null,  
    "is\_nullable": "YES",  
    "column\_default": null,  
    "column\_comment": null  
  },  
  {  
    "table\_name": "master\_list",  
    "column\_name": "seasonal\_availability",  
    "data\_type": "jsonb",  
    "udt\_name": "jsonb",  
    "character\_maximum\_length": null,  
    "is\_nullable": "YES",  
    "column\_default": null,  
    "column\_comment": null  
  },  
  {  
    "table\_name": "master\_list",  
    "column\_name": "peak\_season\_months",  
    "data\_type": "jsonb",  
    "udt\_name": "jsonb",  
    "character\_maximum\_length": null,  
    "is\_nullable": "YES",  
    "column\_default": null,  
    "column\_comment": null  
  },  
  {  
    "table\_name": "master\_list",  
    "column\_name": "availability\_score",  
    "data\_type": "numeric",  
    "udt\_name": "numeric",  
    "character\_maximum\_length": null,  
    "is\_nullable": "YES",  
    "column\_default": null,  
    "column\_comment": null  
  },  
  {  
    "table\_name": "master\_list",  
    "column\_name": "total\_orders",  
    "data\_type": "integer",  
    "udt\_name": "int4",  
    "character\_maximum\_length": null,  
    "is\_nullable": "YES",  
    "column\_default": "0",  
    "column\_comment": null  
  },  
  {  
    "table\_name": "master\_list",  
    "column\_name": "last\_ordered\_at",  
    "data\_type": "timestamp with time zone",  
    "udt\_name": "timestamptz",  
    "character\_maximum\_length": null,  
    "is\_nullable": "YES",  
    "column\_default": null,  
    "column\_comment": null  
  },  
  {  
    "table\_name": "master\_list",  
    "column\_name": "popularity\_score",  
    "data\_type": "numeric",  
    "udt\_name": "numeric",  
    "character\_maximum\_length": null,  
    "is\_nullable": "YES",  
    "column\_default": "0",  
    "column\_comment": null  
  },  
  {  
    "table\_name": "master\_list",  
    "column\_name": "trend\_indicator",  
    "data\_type": "USER-DEFINED",  
    "udt\_name": "trend\_indicator\_enum",  
    "character\_maximum\_length": null,  
    "is\_nullable": "YES",  
    "column\_default": null,  
    "column\_comment": null  
  },  
  {  
    "table\_name": "master\_list",  
    "column\_name": "created\_at",  
    "data\_type": "timestamp with time zone",  
    "udt\_name": "timestamptz",  
    "character\_maximum\_length": null,  
    "is\_nullable": "YES",  
    "column\_default": "now()",  
    "column\_comment": null  
  },  
  {  
    "table\_name": "master\_list",  
    "column\_name": "updated\_at",  
    "data\_type": "timestamp with time zone",  
    "udt\_name": "timestamptz",  
    "character\_maximum\_length": null,  
    "is\_nullable": "YES",  
    "column\_default": "now()",  
    "column\_comment": null  
  },  
  {  
    "table\_name": "master\_list",  
    "column\_name": "created\_by",  
    "data\_type": "integer",  
    "udt\_name": "int4",  
    "character\_maximum\_length": null,  
    "is\_nullable": "YES",  
    "column\_default": null,  
    "column\_comment": null  
  },  
  {  
    "table\_name": "master\_list",  
    "column\_name": "is\_active",  
    "data\_type": "boolean",  
    "udt\_name": "bool",  
    "character\_maximum\_length": null,  
    "is\_nullable": "YES",  
    "column\_default": "true",  
    "column\_comment": null  
  },  
  {  
    "table\_name": "master\_list",  
    "column\_name": "is\_verified",  
    "data\_type": "boolean",  
    "udt\_name": "bool",  
    "character\_maximum\_length": null,  
    "is\_nullable": "YES",  
    "column\_default": "false",  
    "column\_comment": null  
  },  
  {  
    "table\_name": "master\_list",  
    "column\_name": "embedding\_vector\_v2",  
    "data\_type": "USER-DEFINED",  
    "udt\_name": "vector",  
    "character\_maximum\_length": null,  
    "is\_nullable": "YES",  
    "column\_default": null,  
    "column\_comment": null  
  },  
  {  
    "table\_name": "master\_list",  
    "column\_name": "restaurant\_id",  
    "data\_type": "integer",  
    "udt\_name": "int4",  
    "character\_maximum\_length": null,  
    "is\_nullable": "YES",  
    "column\_default": null,  
    "column\_comment": null  
  },  
  {  
    "table\_name": "master\_list",  
    "column\_name": "wallet\_spend\_share\_position",  
    "data\_type": "numeric",  
    "udt\_name": "numeric",  
    "character\_maximum\_length": null,  
    "is\_nullable": "YES",  
    "column\_default": null,  
    "column\_comment": "wallet\_spend\_share\_position"  
  },  
  {  
    "table\_name": "pricing\_history",  
    "column\_name": "id",  
    "data\_type": "bigint",  
    "udt\_name": "int8",  
    "character\_maximum\_length": null,  
    "is\_nullable": "NO",  
    "column\_default": "nextval('pricing\_history\_id\_seq'::regclass)",  
    "column\_comment": null  
  },  
  {  
    "table\_name": "pricing\_history",  
    "column\_name": "supplier\_id",  
    "data\_type": "integer",  
    "udt\_name": "int4",  
    "character\_maximum\_length": null,  
    "is\_nullable": "YES",  
    "column\_default": null,  
    "column\_comment": null  
  },  
  {  
    "table\_name": "pricing\_history",  
    "column\_name": "master\_list\_id",  
    "data\_type": "bigint",  
    "udt\_name": "int8",  
    "character\_maximum\_length": null,  
    "is\_nullable": "YES",  
    "column\_default": null,  
    "column\_comment": null  
  },  
  {  
    "table\_name": "pricing\_history",  
    "column\_name": "supplier\_mapped\_product\_id",  
    "data\_type": "bigint",  
    "udt\_name": "int8",  
    "character\_maximum\_length": null,  
    "is\_nullable": "YES",  
    "column\_default": null,  
    "column\_comment": null  
  },  
  {  
    "table\_name": "pricing\_history",  
    "column\_name": "unit\_price",  
    "data\_type": "numeric",  
    "udt\_name": "numeric",  
    "character\_maximum\_length": null,  
    "is\_nullable": "NO",  
    "column\_default": null,  
    "column\_comment": null  
  },  
  {  
    "table\_name": "pricing\_history",  
    "column\_name": "currency",  
    "data\_type": "character varying",  
    "udt\_name": "varchar",  
    "character\_maximum\_length": 3,  
    "is\_nullable": "YES",  
    "column\_default": "'EUR'::character varying",  
    "column\_comment": null  
  }  
\]

### **2\. ENUMs con sus Valores**

\[  
  {  
    "enum\_name": "ai\_comfort\_level\_enum",  
    "enum\_values": "{low,medium,high}"  
  },  
  {  
    "enum\_name": "availability\_status\_enum",  
    "enum\_values": "{available,limited,out\_of\_stock,discontinued}"  
  },  
  {  
    "enum\_name": "brand\_vs\_master\_enum",  
    "enum\_values": "{same,different,generic}"  
  },  
  {  
    "enum\_name": "business\_type\_enum",  
    "enum\_values": "{wholesaler,distributor,manufacturer,local\_producer}"  
  },  
  {  
    "enum\_name": "category\_maturity\_enum",  
    "enum\_values": "{emerging,growing,mature,declining}"  
  },  
  {  
    "enum\_name": "channel\_type\_enum",  
    "enum\_values": "{whatsapp,telegram,web,mobile,phone,email}"  
  },  
  {  
    "enum\_name": "communication\_style\_enum",  
    "enum\_values": "{formal,casual,technical}"  
  },  
  {  
    "enum\_name": "company\_size\_enum",  
    "enum\_values": "{small,medium,large}"  
  },  
  {  
    "enum\_name": "compliance\_status\_enum",  
    "enum\_values": "{compliant,warning,failed}"  
  },  
  {  
    "enum\_name": "contact\_method\_enum",  
    "enum\_values": "{email,whatsapp,phone,website,portal,fax,in\_person}"  
  },  
  {  
    "enum\_name": "credit\_rating\_enum",  
    "enum\_values": "{excellent,good,fair,poor}"  
  },  
  {  
    "enum\_name": "customer\_base\_size\_enum",  
    "enum\_values": "{small,medium,large}"  
  },  
  {  
    "enum\_name": "customer\_segment\_enum",  
    "enum\_values": "{premium,standard,budget,new,loyal,at\_risk}"  
  },  
  {  
    "enum\_name": "data\_source\_enum",  
    "enum\_values": "{supplier,scraping,manual,api,import}"  
  },  
  {  
    "enum\_name": "decision\_speed\_enum",  
    "enum\_values": "{fast,normal,slow}"  
  },  
  {  
    "enum\_name": "delivery\_status\_enum",  
    "enum\_values": "{scheduled,in\_transit,delivered,failed}"  
  },  
  {  
    "enum\_name": "demand\_level\_enum",  
    "enum\_values": "{low,normal,high,peak}"  
  },  
  {  
    "enum\_name": "engagement\_level\_enum",  
    "enum\_values": "{low,medium,high}"  
  },  
  {  
    "enum\_name": "feedback\_frequency\_enum",  
    "enum\_values": "{never,rare,occasional,frequent}"  
  },  
  {  
    "enum\_name": "follow\_up\_type\_enum",  
    "enum\_values": "{call,email,whatsapp,none}"  
  },  
  {  
    "enum\_name": "fulfillment\_status\_enum",  
    "enum\_values": "{full,partial,failed}"  
  },  
  {  
    "enum\_name": "growth\_trajectory\_enum",  
    "enum\_values": "{growing,stable,declining}"  
  },  
  {  
    "enum\_name": "inquiry\_type\_enum",  
    "enum\_values": "{product\_search,price\_check,order\_placement,support,information,complaint}"  
  },  
  {  
    "enum\_name": "learning\_speed\_enum",  
    "enum\_values": "{slow,normal,fast}"  
  },  
  {  
    "enum\_name": "lifecycle\_stage\_enum",  
    "enum\_values": "{prospect,new,growing,mature,declining}"  
  },  
  {  
    "enum\_name": "mapping\_method\_enum",  
    "enum\_values": "{manual,ai\_matched,verified,customer\_confirmed}"  
  },  
  {  
    "enum\_name": "market\_position\_enum",  
    "enum\_values": "{premium,mid-market,budget}"  
  },  
  {  
    "enum\_name": "market\_position\_price\_enum",  
    "enum\_values": "{below,at,above,premium}"  
  },  
  {  
    "enum\_name": "negotiation\_style\_enum",  
    "enum\_values": "{aggressive,balanced,passive}"  
  },  
  {  
    "enum\_name": "order\_complexity\_enum",  
    "enum\_values": "{simple,moderate,complex}"  
  },  
  {  
    "enum\_name": "order\_status\_enum",  
    "enum\_values": "{pending,confirmed,prepared,shipped,delivered,cancelled}"  
  },  
  {  
    "enum\_name": "order\_type\_enum",  
    "enum\_values": "{regular,emergency,bulk}"  
  },  
  {  
    "enum\_name": "payment\_status\_enum",  
    "enum\_values": "{pending,paid,overdue}"  
  },  
  {  
    "enum\_name": "price\_competitiveness\_enum",  
    "enum\_values": "{low,competitive,high}"  
  },  
  {  
    "enum\_name": "price\_trend\_enum",  
    "enum\_values": "{up,down,stable}"  
  },  
  {  
    "enum\_name": "pricing\_update\_frequency\_enum",  
    "enum\_values": "{daily,weekly,monthly,quarterly,seasonal,irregular}"  
  },  
  {  
    "enum\_name": "priority\_level\_enum",  
    "enum\_values": "{low,normal,high,urgent}"  
  },  
  {  
    "enum\_name": "quality\_tier\_enum",  
    "enum\_values": "{premium,standard,economy}"  
  },  
  {  
    "enum\_name": "quality\_vs\_master\_enum",  
    "enum\_values": "{same,better,worse,unknown}"  
  },  
  {  
    "enum\_name": "research\_depth\_enum",  
    "enum\_values": "{minimal,moderate,thorough}"  
  },  
  {  
    "enum\_name": "resolution\_status\_enum",  
    "enum\_values": "{resolved,pending,escalated}"  
  },  
  {  
    "enum\_name": "restaurant\_type\_enum",  
    "enum\_values": "{restaurant,cafe,bistro,brasserie,hotel,catering}"  
  },  
  {  
    "enum\_name": "revenue\_range\_enum",  
    "enum\_values": "{0-100k,100k-500k,500k+}"  
  },  
  {  
    "enum\_name": "risk\_level\_enum",  
    "enum\_values": "{low,medium,high}"  
  },  
  {  
    "enum\_name": "role\_category\_enum",  
    "enum\_values": "{owner,manager,chef,sous\_chef,buyer,staff}"  
  },  
  {  
    "enum\_name": "seniority\_level\_enum",  
    "enum\_values": "{junior,mid,senior,exec}"  
  },  
  {  
    "enum\_name": "sentiment\_enum",  
    "enum\_values": "{positive,neutral,negative}"  
  },  
  {  
    "enum\_name": "session\_complexity\_enum",  
    "enum\_values": "{simple,moderate,complex}"  
  },  
  {  
    "enum\_name": "session\_type\_enum",  
    "enum\_values": "{discovery,negotiation,transactional,support,setup,purchase}"  
  },  
  {  
    "enum\_name": "size\_vs\_master\_enum",  
    "enum\_values": "{same,larger,smaller}"  
  },  
  {  
    "enum\_name": "supply\_level\_enum",  
    "enum\_values": "{shortage,low,normal,surplus}"  
  },  
  {  
    "enum\_name": "trend\_indicator\_enum",  
    "enum\_values": "{rising,stable,declining}"  
  },  
  {  
    "enum\_name": "urgency\_level\_enum",  
    "enum\_values": "{low,normal,high,critical}"  
  },  
  {  
    "enum\_name": "user\_type\_enum",  
    "enum\_values": "{power\_user,regular,casual}"  
  },  
  {  
    "enum\_name": "value\_tier\_enum",  
    "enum\_values": "{high,medium,low}"  
  },  
  {  
    "enum\_name": "verification\_status\_enum",  
    "enum\_values": "{pending,verified,rejected}"  
  },  
  {  
    "enum\_name": "verification\_status\_price\_enum",  
    "enum\_values": "{unverified,verified,disputed}"  
  }  
\]

### **3\. Primary Keys**

\[  
  {  
    "table\_name": "line\_sessions",  
    "column\_name": "session\_id",  
    "constraint\_name": "line\_sessions\_pkey"  
  },  
  {  
    "table\_name": "master\_list",  
    "column\_name": "id",  
    "constraint\_name": "master\_list\_pkey"  
  },  
  {  
    "table\_name": "pricing\_history",  
    "column\_name": "id",  
    "constraint\_name": "pricing\_history\_pkey"  
  },  
  {  
    "table\_name": "product\_categories",  
    "column\_name": "id",  
    "constraint\_name": "product\_categories\_pkey"  
  },  
  {  
    "table\_name": "purchase\_orders",  
    "column\_name": "order\_id",  
    "constraint\_name": "purchase\_orders\_pkey"  
  },  
  {  
    "table\_name": "restaurant\_people",  
    "column\_name": "id",  
    "constraint\_name": "restaurant\_people\_pkey"  
  },  
  {  
    "table\_name": "restaurant\_product\_preferences",  
    "column\_name": "id",  
    "constraint\_name": "restaurant\_product\_preferences\_pkey"  
  },  
  {  
    "table\_name": "restaurant\_product\_preferences\_history",  
    "column\_name": "id",  
    "constraint\_name": "restaurant\_product\_preferences\_history\_pkey"  
  },  
  {  
    "table\_name": "restaurants",  
    "column\_name": "id",  
    "constraint\_name": "restaurants\_pkey"  
  },  
  {  
    "table\_name": "spatial\_ref\_sys",  
    "column\_name": "srid",  
    "constraint\_name": "spatial\_ref\_sys\_pkey"  
  },  
  {  
    "table\_name": "supplier\_mapped\_products",  
    "column\_name": "id",  
    "constraint\_name": "supplier\_mapped\_products\_pkey"  
  },  
  {  
    "table\_name": "suppliers",  
    "column\_name": "id",  
    "constraint\_name": "suppliers\_pkey"  
  },  
  {  
    "table\_name": "user\_preferences",  
    "column\_name": "id",  
    "constraint\_name": "user\_preferences\_pkey"  
  }  
\]

### **4\. Foreign Keys y Relaciones**

\[  
  {  
    "tabla\_origen": "line\_sessions",  
    "columna\_origen": "parent\_session\_id",  
    "tabla\_destino": "line\_sessions",  
    "columna\_destino": "session\_id",  
    "constraint\_name": "line\_sessions\_parent\_session\_id\_fkey",  
    "update\_rule": "NO ACTION",  
    "delete\_rule": "NO ACTION"  
  },  
  {  
    "tabla\_origen": "line\_sessions",  
    "columna\_origen": "person\_id",  
    "tabla\_destino": "restaurant\_people",  
    "columna\_destino": "id",  
    "constraint\_name": "line\_sessions\_person\_id\_fkey",  
    "update\_rule": "NO ACTION",  
    "delete\_rule": "NO ACTION"  
  },  
  {  
    "tabla\_origen": "line\_sessions",  
    "columna\_origen": "restaurant\_id",  
    "tabla\_destino": "restaurants",  
    "columna\_destino": "id",  
    "constraint\_name": "line\_sessions\_restaurant\_id\_fkey",  
    "update\_rule": "NO ACTION",  
    "delete\_rule": "NO ACTION"  
  },  
  {  
    "tabla\_origen": "master\_list",  
    "columna\_origen": "product\_category\_id",  
    "tabla\_destino": "product\_categories",  
    "columna\_destino": "id",  
    "constraint\_name": "master\_list\_product\_category\_id\_fkey",  
    "update\_rule": "NO ACTION",  
    "delete\_rule": "NO ACTION"  
  },  
  {  
    "tabla\_origen": "master\_list",  
    "columna\_origen": "restaurant\_id",  
    "tabla\_destino": "restaurants",  
    "columna\_destino": "id",  
    "constraint\_name": "master\_list\_restaurant\_id\_fkey",  
    "update\_rule": "NO ACTION",  
    "delete\_rule": "NO ACTION"  
  },  
  {  
    "tabla\_origen": "pricing\_history",  
    "columna\_origen": "master\_list\_id",  
    "tabla\_destino": "master\_list",  
    "columna\_destino": "id",  
    "constraint\_name": "pricing\_history\_master\_list\_id\_fkey",  
    "update\_rule": "NO ACTION",  
    "delete\_rule": "NO ACTION"  
  },  
  {  
    "tabla\_origen": "pricing\_history",  
    "columna\_origen": "supplier\_id",  
    "tabla\_destino": "suppliers",  
    "columna\_destino": "id",  
    "constraint\_name": "pricing\_history\_supplier\_id\_fkey",  
    "update\_rule": "NO ACTION",  
    "delete\_rule": "NO ACTION"  
  },  
  {  
    "tabla\_origen": "pricing\_history",  
    "columna\_origen": "supplier\_mapped\_product\_id",  
    "tabla\_destino": "supplier\_mapped\_products",  
    "columna\_destino": "id",  
    "constraint\_name": "pricing\_history\_supplier\_mapped\_product\_id\_fkey",  
    "update\_rule": "NO ACTION",  
    "delete\_rule": "NO ACTION"  
  },  
  {  
    "tabla\_origen": "product\_categories",  
    "columna\_origen": "parent\_category\_id",  
    "tabla\_destino": "product\_categories",  
    "columna\_destino": "id",  
    "constraint\_name": "product\_categories\_parent\_category\_id\_fkey",  
    "update\_rule": "NO ACTION",  
    "delete\_rule": "NO ACTION"  
  },  
  {  
    "tabla\_origen": "purchase\_orders",  
    "columna\_origen": "ordered\_by\_person\_id",  
    "tabla\_destino": "restaurant\_people",  
    "columna\_destino": "id",  
    "constraint\_name": "purchase\_orders\_ordered\_by\_person\_id\_fkey",  
    "update\_rule": "NO ACTION",  
    "delete\_rule": "NO ACTION"  
  },  
  {  
    "tabla\_origen": "purchase\_orders",  
    "columna\_origen": "restaurant\_id",  
    "tabla\_destino": "restaurants",  
    "columna\_destino": "id",  
    "constraint\_name": "purchase\_orders\_restaurant\_id\_fkey",  
    "update\_rule": "NO ACTION",  
    "delete\_rule": "NO ACTION"  
  },  
  {  
    "tabla\_origen": "purchase\_orders",  
    "columna\_origen": "session\_id",  
    "tabla\_destino": "line\_sessions",  
    "columna\_destino": "session\_id",  
    "constraint\_name": "purchase\_orders\_session\_id\_fkey",  
    "update\_rule": "NO ACTION",  
    "delete\_rule": "NO ACTION"  
  },  
  {  
    "tabla\_origen": "purchase\_orders",  
    "columna\_origen": "supplier\_id",  
    "tabla\_destino": "suppliers",  
    "columna\_destino": "id",  
    "constraint\_name": "purchase\_orders\_supplier\_id\_fkey",  
    "update\_rule": "NO ACTION",  
    "delete\_rule": "NO ACTION"  
  },  
  {  
    "tabla\_origen": "restaurant\_people",  
    "columna\_origen": "reports\_to\_id",  
    "tabla\_destino": "restaurant\_people",  
    "columna\_destino": "id",  
    "constraint\_name": "restaurant\_people\_reports\_to\_id\_fkey",  
    "update\_rule": "NO ACTION",  
    "delete\_rule": "NO ACTION"  
  },  
  {  
    "tabla\_origen": "restaurant\_people",  
    "columna\_origen": "restaurant\_id",  
    "tabla\_destino": "restaurants",  
    "columna\_destino": "id",  
    "constraint\_name": "restaurant\_people\_restaurant\_id\_fkey",  
    "update\_rule": "NO ACTION",  
    "delete\_rule": "NO ACTION"  
  },  
  {  
    "tabla\_origen": "restaurant\_product\_preferences",  
    "columna\_origen": "brand\_preferences\_added\_by",  
    "tabla\_destino": "restaurant\_people",  
    "columna\_destino": "id",  
    "constraint\_name": "restaurant\_product\_preferences\_brand\_added\_by\_fkey",  
    "update\_rule": "NO ACTION",  
    "delete\_rule": "NO ACTION"  
  },  
  {  
    "tabla\_origen": "restaurant\_product\_preferences",  
    "columna\_origen": "frequency\_added\_by",  
    "tabla\_destino": "restaurant\_people",  
    "columna\_destino": "id",  
    "constraint\_name": "restaurant\_product\_preferences\_frequency\_added\_by\_fkey",  
    "update\_rule": "NO ACTION",  
    "delete\_rule": "NO ACTION"  
  },  
  {  
    "tabla\_origen": "restaurant\_product\_preferences",  
    "columna\_origen": "master\_list\_id",  
    "tabla\_destino": "master\_list",  
    "columna\_destino": "id",  
    "constraint\_name": "restaurant\_product\_preferences\_master\_list\_fkey",  
    "update\_rule": "NO ACTION",  
    "delete\_rule": "NO ACTION"  
  },  
  {  
    "tabla\_origen": "restaurant\_product\_preferences",  
    "columna\_origen": "payment\_preference\_added\_by",  
    "tabla\_destino": "restaurant\_people",  
    "columna\_destino": "id",  
    "constraint\_name": "restaurant\_product\_preferences\_payment\_added\_by\_fkey",  
    "update\_rule": "NO ACTION",  
    "delete\_rule": "NO ACTION"  
  },  
  {  
    "tabla\_origen": "restaurant\_product\_preferences",  
    "columna\_origen": "price\_preference\_added\_by",  
    "tabla\_destino": "restaurant\_people",  
    "columna\_destino": "id",  
    "constraint\_name": "restaurant\_product\_preferences\_price\_added\_by\_fkey",  
    "update\_rule": "NO ACTION",  
    "delete\_rule": "NO ACTION"  
  },  
  {  
    "tabla\_origen": "restaurant\_product\_preferences",  
    "columna\_origen": "quality\_preference\_added\_by",  
    "tabla\_destino": "restaurant\_people",  
    "columna\_destino": "id",  
    "constraint\_name": "restaurant\_product\_preferences\_quality\_added\_by\_fkey",  
    "update\_rule": "NO ACTION",  
    "delete\_rule": "NO ACTION"  
  },  
  {  
    "tabla\_origen": "restaurant\_product\_preferences",  
    "columna\_origen": "quantity\_preference\_added\_by",  
    "tabla\_destino": "restaurant\_people",  
    "columna\_destino": "id",  
    "constraint\_name": "restaurant\_product\_preferences\_quantity\_added\_by\_fkey",  
    "update\_rule": "NO ACTION",  
    "delete\_rule": "NO ACTION"  
  },  
  {  
    "tabla\_origen": "restaurant\_product\_preferences",  
    "columna\_origen": "restaurant\_id",  
    "tabla\_destino": "restaurants",  
    "columna\_destino": "id",  
    "constraint\_name": "restaurant\_product\_preferences\_restaurant\_fkey",  
    "update\_rule": "NO ACTION",  
    "delete\_rule": "NO ACTION"  
  },  
  {  
    "tabla\_origen": "restaurant\_product\_preferences",  
    "columna\_origen": "specification\_preference\_added\_by",  
    "tabla\_destino": "restaurant\_people",  
    "columna\_destino": "id",  
    "constraint\_name": "restaurant\_product\_preferences\_spec\_added\_by\_fkey",  
    "update\_rule": "NO ACTION",  
    "delete\_rule": "NO ACTION"  
  },  
  {  
    "tabla\_origen": "restaurant\_product\_preferences",  
    "columna\_origen": "tracked\_only\_added\_by",  
    "tabla\_destino": "restaurant\_people",  
    "columna\_destino": "id",  
    "constraint\_name": "restaurant\_product\_preferences\_tracked\_added\_by\_fkey",  
    "update\_rule": "NO ACTION",  
    "delete\_rule": "NO ACTION"  
  },  
  {  
    "tabla\_origen": "restaurant\_product\_preferences\_history",  
    "columna\_origen": "changed\_by",  
    "tabla\_destino": "restaurant\_people",  
    "columna\_destino": "id",  
    "constraint\_name": "restaurant\_product\_preferences\_history\_changed\_by\_fkey",  
    "update\_rule": "NO ACTION",  
    "delete\_rule": "NO ACTION"  
  },  
  {  
    "tabla\_origen": "restaurant\_product\_preferences\_history",  
    "columna\_origen": "preference\_id",  
    "tabla\_destino": "restaurant\_product\_preferences",  
    "columna\_destino": "id",  
    "constraint\_name": "restaurant\_product\_preferences\_history\_preference\_fkey",  
    "update\_rule": "NO ACTION",  
    "delete\_rule": "CASCADE"  
  },  
  {  
    "tabla\_origen": "restaurant\_product\_preferences\_history",  
    "columna\_origen": "session\_id",  
    "tabla\_destino": "line\_sessions",  
    "columna\_destino": "session\_id",  
    "constraint\_name": "restaurant\_product\_preferences\_history\_session\_fkey",  
    "update\_rule": "NO ACTION",  
    "delete\_rule": "NO ACTION"  
  },  
  {  
    "tabla\_origen": "supplier\_mapped\_products",  
    "columna\_origen": "master\_list\_id",  
    "tabla\_destino": "master\_list",  
    "columna\_destino": "id",  
    "constraint\_name": "supplier\_mapped\_products\_master\_list\_id\_fkey",  
    "update\_rule": "NO ACTION",  
    "delete\_rule": "NO ACTION"  
  },  
  {  
    "tabla\_origen": "supplier\_mapped\_products",  
    "columna\_origen": "supplier\_id",  
    "tabla\_destino": "suppliers",  
    "columna\_destino": "id",  
    "constraint\_name": "supplier\_mapped\_products\_supplier\_id\_fkey",  
    "update\_rule": "NO ACTION",  
    "delete\_rule": "NO ACTION"  
  },  
  {  
    "tabla\_origen": "user\_preferences",  
    "columna\_origen": "master\_list\_id",  
    "tabla\_destino": "master\_list",  
    "columna\_destino": "id",  
    "constraint\_name": "user\_preferences\_master\_list\_id\_fkey",  
    "update\_rule": "NO ACTION",  
    "delete\_rule": "NO ACTION"  
  },  
  {  
    "tabla\_origen": "user\_preferences",  
    "columna\_origen": "person\_id",  
    "tabla\_destino": "restaurant\_people",  
    "columna\_destino": "id",  
    "constraint\_name": "user\_preferences\_person\_id\_fkey",  
    "update\_rule": "NO ACTION",  
    "delete\_rule": "NO ACTION"  
  },  
  {  
    "tabla\_origen": "user\_preferences",  
    "columna\_origen": "restaurant\_id",  
    "tabla\_destino": "restaurants",  
    "columna\_destino": "id",  
    "constraint\_name": "user\_preferences\_restaurant\_id\_fkey",  
    "update\_rule": "NO ACTION",  
    "delete\_rule": "NO ACTION"  
  }  
\]

### **5\. Índices**

\[  
  {  
    "schemaname": "public",  
    "tablename": "line\_sessions",  
    "indexname": "idx\_line\_sessions\_date",  
    "indexdef": "CREATE INDEX idx\_line\_sessions\_date ON public.line\_sessions USING btree (session\_start DESC)"  
  },  
  {  
    "schemaname": "public",  
    "tablename": "line\_sessions",  
    "indexname": "idx\_line\_sessions\_person",  
    "indexdef": "CREATE INDEX idx\_line\_sessions\_person ON public.line\_sessions USING btree (person\_id)"  
  },  
  {  
    "schemaname": "public",  
    "tablename": "line\_sessions",  
    "indexname": "idx\_line\_sessions\_restaurant",  
    "indexdef": "CREATE INDEX idx\_line\_sessions\_restaurant ON public.line\_sessions USING btree (restaurant\_id)"  
  },  
  {  
    "schemaname": "public",  
    "tablename": "line\_sessions",  
    "indexname": "line\_sessions\_pkey",  
    "indexdef": "CREATE UNIQUE INDEX line\_sessions\_pkey ON public.line\_sessions USING btree (session\_id)"  
  },  
  {  
    "schemaname": "public",  
    "tablename": "master\_list",  
    "indexname": "idx\_master\_list\_active",  
    "indexdef": "CREATE INDEX idx\_master\_list\_active ON public.master\_list USING btree (is\_active) WHERE (is\_active \= true)"  
  },  
  {  
    "schemaname": "public",  
    "tablename": "master\_list",  
    "indexname": "idx\_master\_list\_category",  
    "indexdef": "CREATE INDEX idx\_master\_list\_category ON public.master\_list USING btree (product\_category\_id)"  
  },  
  {  
    "schemaname": "public",  
    "tablename": "master\_list",  
    "indexname": "idx\_master\_list\_embedding\_v2",  
    "indexdef": "CREATE INDEX idx\_master\_list\_embedding\_v2 ON public.master\_list USING hnsw (embedding\_vector\_v2 vector\_cosine\_ops)"  
  },  
  {  
    "schemaname": "public",  
    "tablename": "master\_list",  
    "indexname": "idx\_master\_list\_search\_freq",  
    "indexdef": "CREATE INDEX idx\_master\_list\_search\_freq ON public.master\_list USING btree (search\_frequency DESC)"  
  },  
  {  
    "schemaname": "public",  
    "tablename": "master\_list",  
    "indexname": "master\_list\_pkey",  
    "indexdef": "CREATE UNIQUE INDEX master\_list\_pkey ON public.master\_list USING btree (id)"  
  },  
  {  
    "schemaname": "public",  
    "tablename": "pricing\_history",  
    "indexname": "idx\_pricing\_history\_date",  
    "indexdef": "CREATE INDEX idx\_pricing\_history\_date ON public.pricing\_history USING btree (effective\_date DESC)"  
  },  
  {  
    "schemaname": "public",  
    "tablename": "pricing\_history",  
    "indexname": "idx\_pricing\_history\_product",  
    "indexdef": "CREATE INDEX idx\_pricing\_history\_product ON public.pricing\_history USING btree (master\_list\_id)"  
  },  
  {  
    "schemaname": "public",  
    "tablename": "pricing\_history",  
    "indexname": "idx\_pricing\_history\_supplier",  
    "indexdef": "CREATE INDEX idx\_pricing\_history\_supplier ON public.pricing\_history USING btree (supplier\_id)"  
  },  
  {  
    "schemaname": "public",  
    "tablename": "pricing\_history",  
    "indexname": "pricing\_history\_pkey",  
    "indexdef": "CREATE UNIQUE INDEX pricing\_history\_pkey ON public.pricing\_history USING btree (id)"  
  },  
  {  
    "schemaname": "public",  
    "tablename": "product\_categories",  
    "indexname": "idx\_product\_categories\_active",  
    "indexdef": "CREATE INDEX idx\_product\_categories\_active ON public.product\_categories USING btree (is\_active) WHERE (is\_active \= true)"  
  },  
  {  
    "schemaname": "public",  
    "tablename": "product\_categories",  
    "indexname": "idx\_product\_categories\_parent",  
    "indexdef": "CREATE INDEX idx\_product\_categories\_parent ON public.product\_categories USING btree (parent\_category\_id)"  
  },  
  {  
    "schemaname": "public",  
    "tablename": "product\_categories",  
    "indexname": "product\_categories\_category\_slug\_key",  
    "indexdef": "CREATE UNIQUE INDEX product\_categories\_category\_slug\_key ON public.product\_categories USING btree (category\_slug)"  
  },  
  {  
    "schemaname": "public",  
    "tablename": "product\_categories",  
    "indexname": "product\_categories\_pkey",  
    "indexdef": "CREATE UNIQUE INDEX product\_categories\_pkey ON public.product\_categories USING btree (id)"  
  },  
  {  
    "schemaname": "public",  
    "tablename": "purchase\_orders",  
    "indexname": "idx\_purchase\_orders\_date",  
    "indexdef": "CREATE INDEX idx\_purchase\_orders\_date ON public.purchase\_orders USING btree (order\_date DESC)"  
  },  
  {  
    "schemaname": "public",  
    "tablename": "purchase\_orders",  
    "indexname": "idx\_purchase\_orders\_restaurant",  
    "indexdef": "CREATE INDEX idx\_purchase\_orders\_restaurant ON public.purchase\_orders USING btree (restaurant\_id)"  
  },  
  {  
    "schemaname": "public",  
    "tablename": "purchase\_orders",  
    "indexname": "idx\_purchase\_orders\_supplier",  
    "indexdef": "CREATE INDEX idx\_purchase\_orders\_supplier ON public.purchase\_orders USING btree (supplier\_id)"  
  },  
  {  
    "schemaname": "public",  
    "tablename": "purchase\_orders",  
    "indexname": "purchase\_orders\_pkey",  
    "indexdef": "CREATE UNIQUE INDEX purchase\_orders\_pkey ON public.purchase\_orders USING btree (order\_id)"  
  },  
  {  
    "schemaname": "public",  
    "tablename": "restaurant\_people",  
    "indexname": "idx\_restaurant\_people\_active",  
    "indexdef": "CREATE INDEX idx\_restaurant\_people\_active ON public.restaurant\_people USING btree (is\_active) WHERE (is\_active \= true)"  
  },  
  {  
    "schemaname": "public",  
    "tablename": "restaurant\_people",  
    "indexname": "idx\_restaurant\_people\_restaurant",  
    "indexdef": "CREATE INDEX idx\_restaurant\_people\_restaurant ON public.restaurant\_people USING btree (restaurant\_id)"  
  },  
  {  
    "schemaname": "public",  
    "tablename": "restaurant\_people",  
    "indexname": "restaurant\_people\_pkey",  
    "indexdef": "CREATE UNIQUE INDEX restaurant\_people\_pkey ON public.restaurant\_people USING btree (id)"  
  },  
  {  
    "schemaname": "public",  
    "tablename": "restaurant\_product\_preferences",  
    "indexname": "idx\_restaurant\_product\_preferences\_active",  
    "indexdef": "CREATE INDEX idx\_restaurant\_product\_preferences\_active ON public.restaurant\_product\_preferences USING btree (is\_active) WHERE (is\_active \= true)"  
  },  
  {  
    "schemaname": "public",  
    "tablename": "restaurant\_product\_preferences",  
    "indexname": "idx\_restaurant\_product\_preferences\_product",  
    "indexdef": "CREATE INDEX idx\_restaurant\_product\_preferences\_product ON public.restaurant\_product\_preferences USING btree (master\_list\_id)"  
  },  
  {  
    "schemaname": "public",  
    "tablename": "restaurant\_product\_preferences",  
    "indexname": "idx\_restaurant\_product\_preferences\_restaurant",  
    "indexdef": "CREATE INDEX idx\_restaurant\_product\_preferences\_restaurant ON public.restaurant\_product\_preferences USING btree (restaurant\_id)"  
  },  
  {  
    "schemaname": "public",  
    "tablename": "restaurant\_product\_preferences",  
    "indexname": "restaurant\_product\_preferences\_pkey",  
    "indexdef": "CREATE UNIQUE INDEX restaurant\_product\_preferences\_pkey ON public.restaurant\_product\_preferences USING btree (id)"  
  },  
  {  
    "schemaname": "public",  
    "tablename": "restaurant\_product\_preferences",  
    "indexname": "restaurant\_product\_preferences\_unique",  
    "indexdef": "CREATE UNIQUE INDEX restaurant\_product\_preferences\_unique ON public.restaurant\_product\_preferences USING btree (restaurant\_id, master\_list\_id)"  
  },  
  {  
    "schemaname": "public",  
    "tablename": "restaurant\_product\_preferences\_history",  
    "indexname": "idx\_restaurant\_product\_preferences\_history\_changed\_at",  
    "indexdef": "CREATE INDEX idx\_restaurant\_product\_preferences\_history\_changed\_at ON public.restaurant\_product\_preferences\_history USING btree (changed\_at DESC)"  
  },  
  {  
    "schemaname": "public",  
    "tablename": "restaurant\_product\_preferences\_history",  
    "indexname": "idx\_restaurant\_product\_preferences\_history\_changed\_by",  
    "indexdef": "CREATE INDEX idx\_restaurant\_product\_preferences\_history\_changed\_by ON public.restaurant\_product\_preferences\_history USING btree (changed\_by)"  
  },  
  {  
    "schemaname": "public",  
    "tablename": "restaurant\_product\_preferences\_history",  
    "indexname": "idx\_restaurant\_product\_preferences\_history\_preference",  
    "indexdef": "CREATE INDEX idx\_restaurant\_product\_preferences\_history\_preference ON public.restaurant\_product\_preferences\_history USING btree (preference\_id)"  
  },  
  {  
    "schemaname": "public",  
    "tablename": "restaurant\_product\_preferences\_history",  
    "indexname": "idx\_restaurant\_product\_preferences\_history\_product",  
    "indexdef": "CREATE INDEX idx\_restaurant\_product\_preferences\_history\_product ON public.restaurant\_product\_preferences\_history USING btree (master\_list\_id)"  
  },  
  {  
    "schemaname": "public",  
    "tablename": "restaurant\_product\_preferences\_history",  
    "indexname": "idx\_restaurant\_product\_preferences\_history\_restaurant",  
    "indexdef": "CREATE INDEX idx\_restaurant\_product\_preferences\_history\_restaurant ON public.restaurant\_product\_preferences\_history USING btree (restaurant\_id)"  
  },  
  {  
    "schemaname": "public",  
    "tablename": "restaurant\_product\_preferences\_history",  
    "indexname": "idx\_restaurant\_product\_preferences\_history\_session",  
    "indexdef": "CREATE INDEX idx\_restaurant\_product\_preferences\_history\_session ON public.restaurant\_product\_preferences\_history USING btree (session\_id)"  
  },  
  {  
    "schemaname": "public",  
    "tablename": "restaurant\_product\_preferences\_history",  
    "indexname": "restaurant\_product\_preferences\_history\_pkey",  
    "indexdef": "CREATE UNIQUE INDEX restaurant\_product\_preferences\_history\_pkey ON public.restaurant\_product\_preferences\_history USING btree (id)"  
  },  
  {  
    "schemaname": "public",  
    "tablename": "restaurants",  
    "indexname": "idx\_restaurants\_active",  
    "indexdef": "CREATE INDEX idx\_restaurants\_active ON public.restaurants USING btree (is\_active) WHERE (is\_active \= true)"  
  },  
  {  
    "schemaname": "public",  
    "tablename": "restaurants",  
    "indexname": "idx\_restaurants\_location",  
    "indexdef": "CREATE INDEX idx\_restaurants\_location ON public.restaurants USING gist (coordinates) WHERE (coordinates IS NOT NULL)"  
  },  
  {  
    "schemaname": "public",  
    "tablename": "restaurants",  
    "indexname": "idx\_restaurants\_segment",  
    "indexdef": "CREATE INDEX idx\_restaurants\_segment ON public.restaurants USING btree (customer\_segment)"  
  },  
  {  
    "schemaname": "public",  
    "tablename": "restaurants",  
    "indexname": "restaurants\_pkey",  
    "indexdef": "CREATE UNIQUE INDEX restaurants\_pkey ON public.restaurants USING btree (id)"  
  },  
  {  
    "schemaname": "public",  
    "tablename": "spatial\_ref\_sys",  
    "indexname": "spatial\_ref\_sys\_pkey",  
    "indexdef": "CREATE UNIQUE INDEX spatial\_ref\_sys\_pkey ON public.spatial\_ref\_sys USING btree (srid)"  
  },  
  {  
    "schemaname": "public",  
    "tablename": "supplier\_mapped\_products",  
    "indexname": "idx\_supplier\_mapped\_products\_confidence",  
    "indexdef": "CREATE INDEX idx\_supplier\_mapped\_products\_confidence ON public.supplier\_mapped\_products USING btree (mapping\_confidence DESC)"  
  },  
  {  
    "schemaname": "public",  
    "tablename": "supplier\_mapped\_products",  
    "indexname": "idx\_supplier\_mapped\_products\_master",  
    "indexdef": "CREATE INDEX idx\_supplier\_mapped\_products\_master ON public.supplier\_mapped\_products USING btree (master\_list\_id)"  
  },  
  {  
    "schemaname": "public",  
    "tablename": "supplier\_mapped\_products",  
    "indexname": "idx\_supplier\_mapped\_products\_price",  
    "indexdef": "CREATE INDEX idx\_supplier\_mapped\_products\_price ON public.supplier\_mapped\_products USING btree (current\_unit\_price)"  
  },  
  {  
    "schemaname": "public",  
    "tablename": "supplier\_mapped\_products",  
    "indexname": "idx\_supplier\_mapped\_products\_supplier",  
    "indexdef": "CREATE INDEX idx\_supplier\_mapped\_products\_supplier ON public.supplier\_mapped\_products USING btree (supplier\_id)"  
  },  
  {  
    "schemaname": "public",  
    "tablename": "supplier\_mapped\_products",  
    "indexname": "supplier\_mapped\_products\_pkey",  
    "indexdef": "CREATE UNIQUE INDEX supplier\_mapped\_products\_pkey ON public.supplier\_mapped\_products USING btree (id)"  
  },  
  {  
    "schemaname": "public",  
    "tablename": "suppliers",  
    "indexname": "idx\_suppliers\_active",  
    "indexdef": "CREATE INDEX idx\_suppliers\_active ON public.suppliers USING btree (is\_active) WHERE (is\_active \= true)"  
  },  
  {  
    "schemaname": "public",  
    "tablename": "suppliers",  
    "indexname": "idx\_suppliers\_contact\_method",  
    "indexdef": "CREATE INDEX idx\_suppliers\_contact\_method ON public.suppliers USING btree (preferred\_contact\_method)"  
  },  
  {  
    "schemaname": "public",  
    "tablename": "suppliers",  
    "indexname": "idx\_suppliers\_location",  
    "indexdef": "CREATE INDEX idx\_suppliers\_location ON public.suppliers USING gist (coordinates) WHERE (coordinates IS NOT NULL)"  
  },  
  {  
    "schemaname": "public",  
    "tablename": "suppliers",  
    "indexname": "suppliers\_pkey",  
    "indexdef": "CREATE UNIQUE INDEX suppliers\_pkey ON public.suppliers USING btree (id)"  
  },  
  {  
    "schemaname": "public",  
    "tablename": "user\_preferences",  
    "indexname": "idx\_user\_preferences\_person",  
    "indexdef": "CREATE INDEX idx\_user\_preferences\_person ON public.user\_preferences USING btree (person\_id)"  
  },  
  {  
    "schemaname": "public",  
    "tablename": "user\_preferences",  
    "indexname": "idx\_user\_preferences\_restaurant",  
    "indexdef": "CREATE INDEX idx\_user\_preferences\_restaurant ON public.user\_preferences USING btree (restaurant\_id)"  
  },  
  {  
    "schemaname": "public",  
    "tablename": "user\_preferences",  
    "indexname": "idx\_user\_preferences\_type",  
    "indexdef": "CREATE INDEX idx\_user\_preferences\_type ON public.user\_preferences USING btree (preference\_type)"  
  },  
  {  
    "schemaname": "public",  
    "tablename": "user\_preferences",  
    "indexname": "user\_preferences\_pkey",  
    "indexdef": "CREATE UNIQUE INDEX user\_preferences\_pkey ON public.user\_preferences USING btree (id)"  
  }  
\]

### **6\. Triggers**

\[  
  {  
    "trigger\_schema": "public",  
    "trigger\_name": "update\_line\_sessions\_updated\_at",  
    "event\_manipulation": "UPDATE",  
    "event\_object\_table": "line\_sessions",  
    "action\_statement": "EXECUTE FUNCTION update\_updated\_at\_column()",  
    "action\_timing": "BEFORE",  
    "action\_orientation": "ROW"  
  },  
  {  
    "trigger\_schema": "public",  
    "trigger\_name": "update\_master\_list\_updated\_at",  
    "event\_manipulation": "UPDATE",  
    "event\_object\_table": "master\_list",  
    "action\_statement": "EXECUTE FUNCTION update\_updated\_at\_column()",  
    "action\_timing": "BEFORE",  
    "action\_orientation": "ROW"  
  },  
  {  
    "trigger\_schema": "public",  
    "trigger\_name": "update\_pricing\_history\_updated\_at",  
    "event\_manipulation": "UPDATE",  
    "event\_object\_table": "pricing\_history",  
    "action\_statement": "EXECUTE FUNCTION update\_updated\_at\_column()",  
    "action\_timing": "BEFORE",  
    "action\_orientation": "ROW"  
  },  
  {  
    "trigger\_schema": "public",  
    "trigger\_name": "update\_product\_categories\_updated\_at",  
    "event\_manipulation": "UPDATE",  
    "event\_object\_table": "product\_categories",  
    "action\_statement": "EXECUTE FUNCTION update\_updated\_at\_column()",  
    "action\_timing": "BEFORE",  
    "action\_orientation": "ROW"  
  },  
  {  
    "trigger\_schema": "public",  
    "trigger\_name": "update\_purchase\_orders\_updated\_at",  
    "event\_manipulation": "UPDATE",  
    "event\_object\_table": "purchase\_orders",  
    "action\_statement": "EXECUTE FUNCTION update\_updated\_at\_column()",  
    "action\_timing": "BEFORE",  
    "action\_orientation": "ROW"  
  },  
  {  
    "trigger\_schema": "public",  
    "trigger\_name": "update\_restaurant\_people\_updated\_at",  
    "event\_manipulation": "UPDATE",  
    "event\_object\_table": "restaurant\_people",  
    "action\_statement": "EXECUTE FUNCTION update\_updated\_at\_column()",  
    "action\_timing": "BEFORE",  
    "action\_orientation": "ROW"  
  },  
  {  
    "trigger\_schema": "public",  
    "trigger\_name": "trigger\_update\_restaurant\_product\_preferences\_updated\_at",  
    "event\_manipulation": "UPDATE",  
    "event\_object\_table": "restaurant\_product\_preferences",  
    "action\_statement": "EXECUTE FUNCTION update\_restaurant\_product\_preferences\_updated\_at()",  
    "action\_timing": "BEFORE",  
    "action\_orientation": "ROW"  
  },  
  {  
    "trigger\_schema": "public",  
    "trigger\_name": "update\_restaurants\_updated\_at",  
    "event\_manipulation": "UPDATE",  
    "event\_object\_table": "restaurants",  
    "action\_statement": "EXECUTE FUNCTION update\_updated\_at\_column()",  
    "action\_timing": "BEFORE",  
    "action\_orientation": "ROW"  
  },  
  {  
    "trigger\_schema": "public",  
    "trigger\_name": "update\_supplier\_mapped\_products\_updated\_at",  
    "event\_manipulation": "UPDATE",  
    "event\_object\_table": "supplier\_mapped\_products",  
    "action\_statement": "EXECUTE FUNCTION update\_updated\_at\_column()",  
    "action\_timing": "BEFORE",  
    "action\_orientation": "ROW"  
  },  
  {  
    "trigger\_schema": "public",  
    "trigger\_name": "update\_suppliers\_updated\_at",  
    "event\_manipulation": "UPDATE",  
    "event\_object\_table": "suppliers",  
    "action\_statement": "EXECUTE FUNCTION update\_updated\_at\_column()",  
    "action\_timing": "BEFORE",  
    "action\_orientation": "ROW"  
  }  
\]

### **7\. Funciones y Procedimientos**

 \[  
  {  
    "schema": "public",  
    "function\_name": "\_postgis\_deprecate",  
    "arguments": "oldname text, newname text, version text",  
    "return\_type": "void",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.\_postgis\_deprecate(oldname text, newname text, version text)\\n RETURNS void\\n LANGUAGE plpgsql\\n IMMUTABLE STRICT COST 500\\nAS $function$\\nDECLARE\\n  curver\_text text;\\nBEGIN\\n  \--\\n  \-- Raises a NOTICE if it was deprecated in this version,\\n  \-- a WARNING if in a previous version (only up to minor version checked)\\n  \--\\n\\tcurver\_text := '3.3.7';\\n\\tIF pg\_catalog.split\_part(curver\_text,'.',1)::int \> pg\_catalog.split\_part(version,'.',1)::int OR\\n\\t   ( pg\_catalog.split\_part(curver\_text,'.',1) \= pg\_catalog.split\_part(version,'.',1) AND\\n\\t\\t pg\_catalog.split\_part(curver\_text,'.',2) \!= split\_part(version,'.',2) )\\n\\tTHEN\\n\\t  RAISE WARNING '% signature was deprecated in %. Please use %', oldname, version, newname;\\n\\tELSE\\n\\t  RAISE DEBUG '% signature was deprecated in %. Please use %', oldname, version, newname;\\n\\tEND IF;\\nEND;\\n$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "\_postgis\_index\_extent",  
    "arguments": "tbl regclass, col text",  
    "return\_type": "box2d",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.\_postgis\_index\_extent(tbl regclass, col text)\\n RETURNS box2d\\n LANGUAGE c\\n STABLE STRICT\\nAS '$libdir/postgis-3', $function$\_postgis\_gserialized\_index\_extent$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "\_postgis\_join\_selectivity",  
    "arguments": "regclass, text, regclass, text, text DEFAULT '2'::text",  
    "return\_type": "double precision",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.\_postgis\_join\_selectivity(regclass, text, regclass, text, text DEFAULT '2'::text)\\n RETURNS double precision\\n LANGUAGE c\\n PARALLEL SAFE STRICT\\nAS '$libdir/postgis-3', $function$\_postgis\_gserialized\_joinsel$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "\_postgis\_pgsql\_version",  
    "arguments": "",  
    "return\_type": "text",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.\_postgis\_pgsql\_version()\\n RETURNS text\\n LANGUAGE sql\\n STABLE\\nAS $function$\\n\\tSELECT CASE WHEN pg\_catalog.split\_part(s,'.',1)::integer \> 9 THEN pg\_catalog.split\_part(s,'.',1) || '0'\\n\\tELSE pg\_catalog.split\_part(s,'.', 1\) || pg\_catalog.split\_part(s,'.', 2\) END AS v\\n\\tFROM pg\_catalog.substring(version(), E'PostgreSQL (\[0-9\\\\\\\\.\]+)') AS s;\\n$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "\_postgis\_scripts\_pgsql\_version",  
    "arguments": "",  
    "return\_type": "text",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.\_postgis\_scripts\_pgsql\_version()\\n RETURNS text\\n LANGUAGE sql\\n IMMUTABLE\\nAS $function$SELECT '170'::text AS version$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "\_postgis\_selectivity",  
    "arguments": "tbl regclass, att\_name text, geom geometry, mode text DEFAULT '2'::text",  
    "return\_type": "double precision",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.\_postgis\_selectivity(tbl regclass, att\_name text, geom geometry, mode text DEFAULT '2'::text)\\n RETURNS double precision\\n LANGUAGE c\\n PARALLEL SAFE STRICT\\nAS '$libdir/postgis-3', $function$\_postgis\_gserialized\_sel$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "\_postgis\_stats",  
    "arguments": "tbl regclass, att\_name text, text DEFAULT '2'::text",  
    "return\_type": "text",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.\_postgis\_stats(tbl regclass, att\_name text, text DEFAULT '2'::text)\\n RETURNS text\\n LANGUAGE c\\n PARALLEL SAFE STRICT\\nAS '$libdir/postgis-3', $function$\_postgis\_gserialized\_stats$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "\_st\_3ddfullywithin",  
    "arguments": "geom1 geometry, geom2 geometry, double precision",  
    "return\_type": "boolean",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.\_st\_3ddfullywithin(geom1 geometry, geom2 geometry, double precision)\\n RETURNS boolean\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 10000\\nAS '$libdir/postgis-3', $function$LWGEOM\_dfullywithin3d$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "\_st\_3ddwithin",  
    "arguments": "geom1 geometry, geom2 geometry, double precision",  
    "return\_type": "boolean",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.\_st\_3ddwithin(geom1 geometry, geom2 geometry, double precision)\\n RETURNS boolean\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 10000\\nAS '$libdir/postgis-3', $function$LWGEOM\_dwithin3d$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "\_st\_3dintersects",  
    "arguments": "geom1 geometry, geom2 geometry",  
    "return\_type": "boolean",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.\_st\_3dintersects(geom1 geometry, geom2 geometry)\\n RETURNS boolean\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 10000\\nAS '$libdir/postgis-3', $function$ST\_3DIntersects$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "\_st\_asgml",  
    "arguments": "integer, geometry, integer, integer, text, text",  
    "return\_type": "text",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.\_st\_asgml(integer, geometry, integer, integer, text, text)\\n RETURNS text\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE COST 500\\nAS '$libdir/postgis-3', $function$LWGEOM\_asGML$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "\_st\_asx3d",  
    "arguments": "integer, geometry, integer, integer, text",  
    "return\_type": "text",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.\_st\_asx3d(integer, geometry, integer, integer, text)\\n RETURNS text\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE COST 500\\nAS '$libdir/postgis-3', $function$LWGEOM\_asX3D$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "\_st\_bestsrid",  
    "arguments": "geography",  
    "return\_type": "integer",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.\_st\_bestsrid(geography)\\n RETURNS integer\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 50\\nAS '$libdir/postgis-3', $function$geography\_bestsrid$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "\_st\_bestsrid",  
    "arguments": "geography, geography",  
    "return\_type": "integer",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.\_st\_bestsrid(geography, geography)\\n RETURNS integer\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 50\\nAS '$libdir/postgis-3', $function$geography\_bestsrid$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "\_st\_contains",  
    "arguments": "geom1 geometry, geom2 geometry",  
    "return\_type": "boolean",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.\_st\_contains(geom1 geometry, geom2 geometry)\\n RETURNS boolean\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 10000\\nAS '$libdir/postgis-3', $function$contains$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "\_st\_containsproperly",  
    "arguments": "geom1 geometry, geom2 geometry",  
    "return\_type": "boolean",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.\_st\_containsproperly(geom1 geometry, geom2 geometry)\\n RETURNS boolean\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 10000\\nAS '$libdir/postgis-3', $function$containsproperly$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "\_st\_coveredby",  
    "arguments": "geog1 geography, geog2 geography",  
    "return\_type": "boolean",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.\_st\_coveredby(geog1 geography, geog2 geography)\\n RETURNS boolean\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 10000\\nAS '$libdir/postgis-3', $function$geography\_coveredby$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "\_st\_coveredby",  
    "arguments": "geom1 geometry, geom2 geometry",  
    "return\_type": "boolean",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.\_st\_coveredby(geom1 geometry, geom2 geometry)\\n RETURNS boolean\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 10000\\nAS '$libdir/postgis-3', $function$coveredby$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "\_st\_covers",  
    "arguments": "geog1 geography, geog2 geography",  
    "return\_type": "boolean",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.\_st\_covers(geog1 geography, geog2 geography)\\n RETURNS boolean\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 10000\\nAS '$libdir/postgis-3', $function$geography\_covers$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "\_st\_covers",  
    "arguments": "geom1 geometry, geom2 geometry",  
    "return\_type": "boolean",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.\_st\_covers(geom1 geometry, geom2 geometry)\\n RETURNS boolean\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 10000\\nAS '$libdir/postgis-3', $function$covers$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "\_st\_crosses",  
    "arguments": "geom1 geometry, geom2 geometry",  
    "return\_type": "boolean",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.\_st\_crosses(geom1 geometry, geom2 geometry)\\n RETURNS boolean\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 10000\\nAS '$libdir/postgis-3', $function$crosses$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "\_st\_dfullywithin",  
    "arguments": "geom1 geometry, geom2 geometry, double precision",  
    "return\_type": "boolean",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.\_st\_dfullywithin(geom1 geometry, geom2 geometry, double precision)\\n RETURNS boolean\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 10000\\nAS '$libdir/postgis-3', $function$LWGEOM\_dfullywithin$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "\_st\_distancetree",  
    "arguments": "geography, geography",  
    "return\_type": "double precision",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.\_st\_distancetree(geography, geography)\\n RETURNS double precision\\n LANGUAGE sql\\n IMMUTABLE STRICT\\nAS $function$SELECT public.\_ST\_DistanceTree($1, $2, 0.0, true)$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "\_st\_distancetree",  
    "arguments": "geography, geography, double precision, boolean",  
    "return\_type": "double precision",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.\_st\_distancetree(geography, geography, double precision, boolean)\\n RETURNS double precision\\n LANGUAGE c\\n IMMUTABLE STRICT COST 10000\\nAS '$libdir/postgis-3', $function$geography\_distance\_tree$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "\_st\_distanceuncached",  
    "arguments": "geography, geography",  
    "return\_type": "double precision",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.\_st\_distanceuncached(geography, geography)\\n RETURNS double precision\\n LANGUAGE sql\\n IMMUTABLE STRICT\\nAS $function$SELECT public.\_ST\_DistanceUnCached($1, $2, 0.0, true)$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "\_st\_distanceuncached",  
    "arguments": "geography, geography, double precision, boolean",  
    "return\_type": "double precision",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.\_st\_distanceuncached(geography, geography, double precision, boolean)\\n RETURNS double precision\\n LANGUAGE c\\n IMMUTABLE STRICT COST 10000\\nAS '$libdir/postgis-3', $function$geography\_distance\_uncached$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "\_st\_distanceuncached",  
    "arguments": "geography, geography, boolean",  
    "return\_type": "double precision",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.\_st\_distanceuncached(geography, geography, boolean)\\n RETURNS double precision\\n LANGUAGE sql\\n IMMUTABLE STRICT\\nAS $function$SELECT public.\_ST\_DistanceUnCached($1, $2, 0.0, $3)$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "\_st\_dwithin",  
    "arguments": "geog1 geography, geog2 geography, tolerance double precision, use\_spheroid boolean DEFAULT true",  
    "return\_type": "boolean",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.\_st\_dwithin(geog1 geography, geog2 geography, tolerance double precision, use\_spheroid boolean DEFAULT true)\\n RETURNS boolean\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 10000\\nAS '$libdir/postgis-3', $function$geography\_dwithin$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "\_st\_dwithin",  
    "arguments": "geom1 geometry, geom2 geometry, double precision",  
    "return\_type": "boolean",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.\_st\_dwithin(geom1 geometry, geom2 geometry, double precision)\\n RETURNS boolean\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 10000\\nAS '$libdir/postgis-3', $function$LWGEOM\_dwithin$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "\_st\_dwithinuncached",  
    "arguments": "geography, geography, double precision, boolean",  
    "return\_type": "boolean",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.\_st\_dwithinuncached(geography, geography, double precision, boolean)\\n RETURNS boolean\\n LANGUAGE c\\n IMMUTABLE STRICT COST 10000\\nAS '$libdir/postgis-3', $function$geography\_dwithin\_uncached$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "\_st\_dwithinuncached",  
    "arguments": "geography, geography, double precision",  
    "return\_type": "boolean",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.\_st\_dwithinuncached(geography, geography, double precision)\\n RETURNS boolean\\n LANGUAGE sql\\n IMMUTABLE\\nAS $function$SELECT $1 OPERATOR(public.&&) public.\_ST\_Expand($2,$3) AND $2 OPERATOR(public.&&) public.\_ST\_Expand($1,$3) AND public.\_ST\_DWithinUnCached($1, $2, $3, true)$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "\_st\_equals",  
    "arguments": "geom1 geometry, geom2 geometry",  
    "return\_type": "boolean",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.\_st\_equals(geom1 geometry, geom2 geometry)\\n RETURNS boolean\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 10000\\nAS '$libdir/postgis-3', $function$ST\_Equals$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "\_st\_expand",  
    "arguments": "geography, double precision",  
    "return\_type": "geography",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.\_st\_expand(geography, double precision)\\n RETURNS geography\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 50\\nAS '$libdir/postgis-3', $function$geography\_expand$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "\_st\_geomfromgml",  
    "arguments": "text, integer",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.\_st\_geomfromgml(text, integer)\\n RETURNS geometry\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE COST 500\\nAS '$libdir/postgis-3', $function$geom\_from\_gml$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "\_st\_intersects",  
    "arguments": "geom1 geometry, geom2 geometry",  
    "return\_type": "boolean",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.\_st\_intersects(geom1 geometry, geom2 geometry)\\n RETURNS boolean\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 10000\\nAS '$libdir/postgis-3', $function$ST\_Intersects$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "\_st\_linecrossingdirection",  
    "arguments": "line1 geometry, line2 geometry",  
    "return\_type": "integer",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.\_st\_linecrossingdirection(line1 geometry, line2 geometry)\\n RETURNS integer\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 10000\\nAS '$libdir/postgis-3', $function$ST\_LineCrossingDirection$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "\_st\_longestline",  
    "arguments": "geom1 geometry, geom2 geometry",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.\_st\_longestline(geom1 geometry, geom2 geometry)\\n RETURNS geometry\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 500\\nAS '$libdir/postgis-3', $function$LWGEOM\_longestline2d$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "\_st\_maxdistance",  
    "arguments": "geom1 geometry, geom2 geometry",  
    "return\_type": "double precision",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.\_st\_maxdistance(geom1 geometry, geom2 geometry)\\n RETURNS double precision\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 500\\nAS '$libdir/postgis-3', $function$LWGEOM\_maxdistance2d\_linestring$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "\_st\_orderingequals",  
    "arguments": "geom1 geometry, geom2 geometry",  
    "return\_type": "boolean",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.\_st\_orderingequals(geom1 geometry, geom2 geometry)\\n RETURNS boolean\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 10000\\nAS '$libdir/postgis-3', $function$LWGEOM\_same$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "\_st\_overlaps",  
    "arguments": "geom1 geometry, geom2 geometry",  
    "return\_type": "boolean",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.\_st\_overlaps(geom1 geometry, geom2 geometry)\\n RETURNS boolean\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 10000\\nAS '$libdir/postgis-3', $function$overlaps$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "\_st\_pointoutside",  
    "arguments": "geography",  
    "return\_type": "geography",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.\_st\_pointoutside(geography)\\n RETURNS geography\\n LANGUAGE c\\n IMMUTABLE STRICT\\nAS '$libdir/postgis-3', $function$geography\_point\_outside$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "\_st\_sortablehash",  
    "arguments": "geom geometry",  
    "return\_type": "bigint",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.\_st\_sortablehash(geom geometry)\\n RETURNS bigint\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 50\\nAS '$libdir/postgis-3', $function$\_ST\_SortableHash$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "\_st\_touches",  
    "arguments": "geom1 geometry, geom2 geometry",  
    "return\_type": "boolean",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.\_st\_touches(geom1 geometry, geom2 geometry)\\n RETURNS boolean\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 10000\\nAS '$libdir/postgis-3', $function$touches$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "\_st\_voronoi",  
    "arguments": "g1 geometry, clip geometry DEFAULT NULL::geometry, tolerance double precision DEFAULT 0.0, return\_polygons boolean DEFAULT true",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.\_st\_voronoi(g1 geometry, clip geometry DEFAULT NULL::geometry, tolerance double precision DEFAULT 0.0, return\_polygons boolean DEFAULT true)\\n RETURNS geometry\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE COST 10000\\nAS '$libdir/postgis-3', $function$ST\_Voronoi$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "\_st\_within",  
    "arguments": "geom1 geometry, geom2 geometry",  
    "return\_type": "boolean",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.\_st\_within(geom1 geometry, geom2 geometry)\\n RETURNS boolean\\n LANGUAGE sql\\n IMMUTABLE PARALLEL SAFE\\nAS $function$SELECT public.\_ST\_Contains($2,$1)$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "addauth",  
    "arguments": "text",  
    "return\_type": "boolean",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.addauth(text)\\n RETURNS boolean\\n LANGUAGE plpgsql\\nAS $function$\\nDECLARE\\n\\tlockid alias for $1;\\n\\tokay boolean;\\n\\tmyrec record;\\nBEGIN\\n\\t-- check to see if table exists\\n\\t--  if not, CREATE TEMP TABLE mylock (transid xid, lockcode text)\\n\\tokay := 'f';\\n\\tFOR myrec IN SELECT \* FROM pg\_class WHERE relname \= 'temp\_lock\_have\_table' LOOP\\n\\t\\tokay := 't';\\n\\tEND LOOP;\\n\\tIF (okay \<\> 't') THEN\\n\\t\\tCREATE TEMP TABLE temp\_lock\_have\_table (transid xid, lockcode text);\\n\\t\\t\\t-- this will only work from pgsql7.4 up\\n\\t\\t\\t-- ON COMMIT DELETE ROWS;\\n\\tEND IF;\\n\\n\\t--  INSERT INTO mylock VALUES ( $1)\\n--\\tEXECUTE 'INSERT INTO temp\_lock\_have\_table VALUES ( '||\\n--\\t\\tquote\_literal(getTransactionID()) || ',' ||\\n--\\t\\tquote\_literal(lockid) ||')';\\n\\n\\tINSERT INTO temp\_lock\_have\_table VALUES (getTransactionID(), lockid);\\n\\n\\tRETURN true::boolean;\\nEND;\\n$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "addgeometrycolumn",  
    "arguments": "schema\_name character varying, table\_name character varying, column\_name character varying, new\_srid integer, new\_type character varying, new\_dim integer, use\_typmod boolean DEFAULT true",  
    "return\_type": "text",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.addgeometrycolumn(schema\_name character varying, table\_name character varying, column\_name character varying, new\_srid integer, new\_type character varying, new\_dim integer, use\_typmod boolean DEFAULT true)\\n RETURNS text\\n LANGUAGE plpgsql\\n STABLE STRICT\\nAS $function$\\nDECLARE\\n\\tret  text;\\nBEGIN\\n\\tSELECT public.AddGeometryColumn('',$1,$2,$3,$4,$5,$6,$7) into ret;\\n\\tRETURN ret;\\nEND;\\n$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "addgeometrycolumn",  
    "arguments": "catalog\_name character varying, schema\_name character varying, table\_name character varying, column\_name character varying, new\_srid\_in integer, new\_type character varying, new\_dim integer, use\_typmod boolean DEFAULT true",  
    "return\_type": "text",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.addgeometrycolumn(catalog\_name character varying, schema\_name character varying, table\_name character varying, column\_name character varying, new\_srid\_in integer, new\_type character varying, new\_dim integer, use\_typmod boolean DEFAULT true)\\n RETURNS text\\n LANGUAGE plpgsql\\n STRICT\\nAS $function$\\nDECLARE\\n\\trec RECORD;\\n\\tsr varchar;\\n\\treal\_schema name;\\n\\tsql text;\\n\\tnew\_srid integer;\\n\\nBEGIN\\n\\n\\t-- Verify geometry type\\n\\tIF (postgis\_type\_name(new\_type,new\_dim) IS NULL )\\n\\tTHEN\\n\\t\\tRAISE EXCEPTION 'Invalid type name \\"%(%)\\" \- valid ones are:\\n\\tPOINT, MULTIPOINT,\\n\\tLINESTRING, MULTILINESTRING,\\n\\tPOLYGON, MULTIPOLYGON,\\n\\tCIRCULARSTRING, COMPOUNDCURVE, MULTICURVE,\\n\\tCURVEPOLYGON, MULTISURFACE,\\n\\tGEOMETRY, GEOMETRYCOLLECTION,\\n\\tPOINTM, MULTIPOINTM,\\n\\tLINESTRINGM, MULTILINESTRINGM,\\n\\tPOLYGONM, MULTIPOLYGONM,\\n\\tCIRCULARSTRINGM, COMPOUNDCURVEM, MULTICURVEM\\n\\tCURVEPOLYGONM, MULTISURFACEM, TRIANGLE, TRIANGLEM,\\n\\tPOLYHEDRALSURFACE, POLYHEDRALSURFACEM, TIN, TINM\\n\\tor GEOMETRYCOLLECTIONM', new\_type, new\_dim;\\n\\t\\tRETURN 'fail';\\n\\tEND IF;\\n\\n\\t-- Verify dimension\\n\\tIF ( (new\_dim \>4) OR (new\_dim \<2) ) THEN\\n\\t\\tRAISE EXCEPTION 'invalid dimension';\\n\\t\\tRETURN 'fail';\\n\\tEND IF;\\n\\n\\tIF ( (new\_type LIKE '%M') AND (new\_dim\!=3) ) THEN\\n\\t\\tRAISE EXCEPTION 'TypeM needs 3 dimensions';\\n\\t\\tRETURN 'fail';\\n\\tEND IF;\\n\\n\\t-- Verify SRID\\n\\tIF ( new\_srid\_in \> 0 ) THEN\\n\\t\\tIF new\_srid\_in \> 998999 THEN\\n\\t\\t\\tRAISE EXCEPTION 'AddGeometryColumn() \- SRID must be \<= %', 998999;\\n\\t\\tEND IF;\\n\\t\\tnew\_srid := new\_srid\_in;\\n\\t\\tSELECT SRID INTO sr FROM spatial\_ref\_sys WHERE SRID \= new\_srid;\\n\\t\\tIF NOT FOUND THEN\\n\\t\\t\\tRAISE EXCEPTION 'AddGeometryColumn() \- invalid SRID';\\n\\t\\t\\tRETURN 'fail';\\n\\t\\tEND IF;\\n\\tELSE\\n\\t\\tnew\_srid := public.ST\_SRID('POINT EMPTY'::public.geometry);\\n\\t\\tIF ( new\_srid\_in \!= new\_srid ) THEN\\n\\t\\t\\tRAISE NOTICE 'SRID value % converted to the officially unknown SRID value %', new\_srid\_in, new\_srid;\\n\\t\\tEND IF;\\n\\tEND IF;\\n\\n\\t-- Verify schema\\n\\tIF ( schema\_name IS NOT NULL AND schema\_name \!= '' ) THEN\\n\\t\\tsql := 'SELECT nspname FROM pg\_namespace ' ||\\n\\t\\t\\t'WHERE text(nspname) \= ' || quote\_literal(schema\_name) ||\\n\\t\\t\\t'LIMIT 1';\\n\\t\\tRAISE DEBUG '%', sql;\\n\\t\\tEXECUTE sql INTO real\_schema;\\n\\n\\t\\tIF ( real\_schema IS NULL ) THEN\\n\\t\\t\\tRAISE EXCEPTION 'Schema % is not a valid schemaname', quote\_literal(schema\_name);\\n\\t\\t\\tRETURN 'fail';\\n\\t\\tEND IF;\\n\\tEND IF;\\n\\n\\tIF ( real\_schema IS NULL ) THEN\\n\\t\\tRAISE DEBUG 'Detecting schema';\\n\\t\\tsql := 'SELECT n.nspname AS schemaname ' ||\\n\\t\\t\\t'FROM pg\_catalog.pg\_class c ' ||\\n\\t\\t\\t  'JOIN pg\_catalog.pg\_namespace n ON n.oid \= c.relnamespace ' ||\\n\\t\\t\\t'WHERE c.relkind \= ' || quote\_literal('r') ||\\n\\t\\t\\t' AND n.nspname NOT IN (' || quote\_literal('pg\_catalog') || ', ' || quote\_literal('pg\_toast') || ')' ||\\n\\t\\t\\t' AND pg\_catalog.pg\_table\_is\_visible(c.oid)' ||\\n\\t\\t\\t' AND c.relname \= ' || quote\_literal(table\_name);\\n\\t\\tRAISE DEBUG '%', sql;\\n\\t\\tEXECUTE sql INTO real\_schema;\\n\\n\\t\\tIF ( real\_schema IS NULL ) THEN\\n\\t\\t\\tRAISE EXCEPTION 'Table % does not occur in the search\_path', quote\_literal(table\_name);\\n\\t\\t\\tRETURN 'fail';\\n\\t\\tEND IF;\\n\\tEND IF;\\n\\n\\t-- Add geometry column to table\\n\\tIF use\_typmod THEN\\n\\t\\t sql := 'ALTER TABLE ' ||\\n\\t\\t\\tquote\_ident(real\_schema) || '.' || quote\_ident(table\_name)\\n\\t\\t\\t|| ' ADD COLUMN ' || quote\_ident(column\_name) ||\\n\\t\\t\\t' geometry(' || public.postgis\_type\_name(new\_type, new\_dim) || ', ' || new\_srid::text || ')';\\n\\t\\tRAISE DEBUG '%', sql;\\n\\tELSE\\n\\t\\tsql := 'ALTER TABLE ' ||\\n\\t\\t\\tquote\_ident(real\_schema) || '.' || quote\_ident(table\_name)\\n\\t\\t\\t|| ' ADD COLUMN ' || quote\_ident(column\_name) ||\\n\\t\\t\\t' geometry ';\\n\\t\\tRAISE DEBUG '%', sql;\\n\\tEND IF;\\n\\tEXECUTE sql;\\n\\n\\tIF NOT use\_typmod THEN\\n\\t\\t-- Add table CHECKs\\n\\t\\tsql := 'ALTER TABLE ' ||\\n\\t\\t\\tquote\_ident(real\_schema) || '.' || quote\_ident(table\_name)\\n\\t\\t\\t|| ' ADD CONSTRAINT '\\n\\t\\t\\t|| quote\_ident('enforce\_srid\_' || column\_name)\\n\\t\\t\\t|| ' CHECK (st\_srid(' || quote\_ident(column\_name) ||\\n\\t\\t\\t') \= ' || new\_srid::text || ')' ;\\n\\t\\tRAISE DEBUG '%', sql;\\n\\t\\tEXECUTE sql;\\n\\n\\t\\tsql := 'ALTER TABLE ' ||\\n\\t\\t\\tquote\_ident(real\_schema) || '.' || quote\_ident(table\_name)\\n\\t\\t\\t|| ' ADD CONSTRAINT '\\n\\t\\t\\t|| quote\_ident('enforce\_dims\_' || column\_name)\\n\\t\\t\\t|| ' CHECK (st\_ndims(' || quote\_ident(column\_name) ||\\n\\t\\t\\t') \= ' || new\_dim::text || ')' ;\\n\\t\\tRAISE DEBUG '%', sql;\\n\\t\\tEXECUTE sql;\\n\\n\\t\\tIF ( NOT (new\_type \= 'GEOMETRY')) THEN\\n\\t\\t\\tsql := 'ALTER TABLE ' ||\\n\\t\\t\\t\\tquote\_ident(real\_schema) || '.' || quote\_ident(table\_name) || ' ADD CONSTRAINT ' ||\\n\\t\\t\\t\\tquote\_ident('enforce\_geotype\_' || column\_name) ||\\n\\t\\t\\t\\t' CHECK (GeometryType(' ||\\n\\t\\t\\t\\tquote\_ident(column\_name) || ')=' ||\\n\\t\\t\\t\\tquote\_literal(new\_type) || ' OR (' ||\\n\\t\\t\\t\\tquote\_ident(column\_name) || ') is null)';\\n\\t\\t\\tRAISE DEBUG '%', sql;\\n\\t\\t\\tEXECUTE sql;\\n\\t\\tEND IF;\\n\\tEND IF;\\n\\n\\tRETURN\\n\\t\\treal\_schema || '.' ||\\n\\t\\ttable\_name || '.' || column\_name ||\\n\\t\\t' SRID:' || new\_srid::text ||\\n\\t\\t' TYPE:' || new\_type ||\\n\\t\\t' DIMS:' || new\_dim::text || ' ';\\nEND;\\n$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "addgeometrycolumn",  
    "arguments": "table\_name character varying, column\_name character varying, new\_srid integer, new\_type character varying, new\_dim integer, use\_typmod boolean DEFAULT true",  
    "return\_type": "text",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.addgeometrycolumn(table\_name character varying, column\_name character varying, new\_srid integer, new\_type character varying, new\_dim integer, use\_typmod boolean DEFAULT true)\\n RETURNS text\\n LANGUAGE plpgsql\\n STRICT\\nAS $function$\\nDECLARE\\n\\tret  text;\\nBEGIN\\n\\tSELECT public.AddGeometryColumn('','',$1,$2,$3,$4,$5, $6) into ret;\\n\\tRETURN ret;\\nEND;\\n$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "array\_to\_halfvec",  
    "arguments": "double precision\[\], integer, boolean",  
    "return\_type": "halfvec",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.array\_to\_halfvec(double precision\[\], integer, boolean)\\n RETURNS halfvec\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/vector', $function$array\_to\_halfvec$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "array\_to\_halfvec",  
    "arguments": "integer\[\], integer, boolean",  
    "return\_type": "halfvec",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.array\_to\_halfvec(integer\[\], integer, boolean)\\n RETURNS halfvec\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/vector', $function$array\_to\_halfvec$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "array\_to\_halfvec",  
    "arguments": "real\[\], integer, boolean",  
    "return\_type": "halfvec",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.array\_to\_halfvec(real\[\], integer, boolean)\\n RETURNS halfvec\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/vector', $function$array\_to\_halfvec$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "array\_to\_halfvec",  
    "arguments": "numeric\[\], integer, boolean",  
    "return\_type": "halfvec",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.array\_to\_halfvec(numeric\[\], integer, boolean)\\n RETURNS halfvec\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/vector', $function$array\_to\_halfvec$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "array\_to\_sparsevec",  
    "arguments": "integer\[\], integer, boolean",  
    "return\_type": "sparsevec",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.array\_to\_sparsevec(integer\[\], integer, boolean)\\n RETURNS sparsevec\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/vector', $function$array\_to\_sparsevec$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "array\_to\_sparsevec",  
    "arguments": "double precision\[\], integer, boolean",  
    "return\_type": "sparsevec",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.array\_to\_sparsevec(double precision\[\], integer, boolean)\\n RETURNS sparsevec\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/vector', $function$array\_to\_sparsevec$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "array\_to\_sparsevec",  
    "arguments": "numeric\[\], integer, boolean",  
    "return\_type": "sparsevec",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.array\_to\_sparsevec(numeric\[\], integer, boolean)\\n RETURNS sparsevec\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/vector', $function$array\_to\_sparsevec$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "array\_to\_sparsevec",  
    "arguments": "real\[\], integer, boolean",  
    "return\_type": "sparsevec",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.array\_to\_sparsevec(real\[\], integer, boolean)\\n RETURNS sparsevec\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/vector', $function$array\_to\_sparsevec$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "array\_to\_vector",  
    "arguments": "numeric\[\], integer, boolean",  
    "return\_type": "vector",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.array\_to\_vector(numeric\[\], integer, boolean)\\n RETURNS vector\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/vector', $function$array\_to\_vector$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "array\_to\_vector",  
    "arguments": "integer\[\], integer, boolean",  
    "return\_type": "vector",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.array\_to\_vector(integer\[\], integer, boolean)\\n RETURNS vector\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/vector', $function$array\_to\_vector$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "array\_to\_vector",  
    "arguments": "real\[\], integer, boolean",  
    "return\_type": "vector",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.array\_to\_vector(real\[\], integer, boolean)\\n RETURNS vector\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/vector', $function$array\_to\_vector$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "array\_to\_vector",  
    "arguments": "double precision\[\], integer, boolean",  
    "return\_type": "vector",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.array\_to\_vector(double precision\[\], integer, boolean)\\n RETURNS vector\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/vector', $function$array\_to\_vector$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "binary\_quantize",  
    "arguments": "halfvec",  
    "return\_type": "bit",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.binary\_quantize(halfvec)\\n RETURNS bit\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/vector', $function$halfvec\_binary\_quantize$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "binary\_quantize",  
    "arguments": "vector",  
    "return\_type": "bit",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.binary\_quantize(vector)\\n RETURNS bit\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/vector', $function$binary\_quantize$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "box",  
    "arguments": "box3d",  
    "return\_type": "box",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.box(box3d)\\n RETURNS box\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 50\\nAS '$libdir/postgis-3', $function$BOX3D\_to\_BOX$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "box",  
    "arguments": "geometry",  
    "return\_type": "box",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.box(geometry)\\n RETURNS box\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 50\\nAS '$libdir/postgis-3', $function$LWGEOM\_to\_BOX$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "box2d",  
    "arguments": "geometry",  
    "return\_type": "box2d",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.box2d(geometry)\\n RETURNS box2d\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 50\\nAS '$libdir/postgis-3', $function$LWGEOM\_to\_BOX2D$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "box2d",  
    "arguments": "box3d",  
    "return\_type": "box2d",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.box2d(box3d)\\n RETURNS box2d\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 50\\nAS '$libdir/postgis-3', $function$BOX3D\_to\_BOX2D$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "box2d\_in",  
    "arguments": "cstring",  
    "return\_type": "box2d",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.box2d\_in(cstring)\\n RETURNS box2d\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/postgis-3', $function$BOX2D\_in$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "box2d\_out",  
    "arguments": "box2d",  
    "return\_type": "cstring",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.box2d\_out(box2d)\\n RETURNS cstring\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/postgis-3', $function$BOX2D\_out$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "box2df\_in",  
    "arguments": "cstring",  
    "return\_type": "box2df",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.box2df\_in(cstring)\\n RETURNS box2df\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/postgis-3', $function$box2df\_in$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "box2df\_out",  
    "arguments": "box2df",  
    "return\_type": "cstring",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.box2df\_out(box2df)\\n RETURNS cstring\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/postgis-3', $function$box2df\_out$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "box3d",  
    "arguments": "box2d",  
    "return\_type": "box3d",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.box3d(box2d)\\n RETURNS box3d\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 50\\nAS '$libdir/postgis-3', $function$BOX2D\_to\_BOX3D$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "box3d",  
    "arguments": "geometry",  
    "return\_type": "box3d",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.box3d(geometry)\\n RETURNS box3d\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 50\\nAS '$libdir/postgis-3', $function$LWGEOM\_to\_BOX3D$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "box3d\_in",  
    "arguments": "cstring",  
    "return\_type": "box3d",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.box3d\_in(cstring)\\n RETURNS box3d\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/postgis-3', $function$BOX3D\_in$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "box3d\_out",  
    "arguments": "box3d",  
    "return\_type": "cstring",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.box3d\_out(box3d)\\n RETURNS cstring\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/postgis-3', $function$BOX3D\_out$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "box3dtobox",  
    "arguments": "box3d",  
    "return\_type": "box",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.box3dtobox(box3d)\\n RETURNS box\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 50\\nAS '$libdir/postgis-3', $function$BOX3D\_to\_BOX$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "bytea",  
    "arguments": "geometry",  
    "return\_type": "bytea",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.bytea(geometry)\\n RETURNS bytea\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 50\\nAS '$libdir/postgis-3', $function$LWGEOM\_to\_bytea$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "bytea",  
    "arguments": "geography",  
    "return\_type": "bytea",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.bytea(geography)\\n RETURNS bytea\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/postgis-3', $function$LWGEOM\_to\_bytea$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "checkauth",  
    "arguments": "text, text, text",  
    "return\_type": "integer",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.checkauth(text, text, text)\\n RETURNS integer\\n LANGUAGE plpgsql\\nAS $function$\\nDECLARE\\n\\tschema text;\\nBEGIN\\n\\tIF NOT LongTransactionsEnabled() THEN\\n\\t\\tRAISE EXCEPTION 'Long transaction support disabled, use EnableLongTransaction() to enable.';\\n\\tEND IF;\\n\\n\\tif ( $1 \!= '' ) THEN\\n\\t\\tschema \= $1;\\n\\tELSE\\n\\t\\tSELECT current\_schema() into schema;\\n\\tEND IF;\\n\\n\\t-- TODO: check for an already existing trigger ?\\n\\n\\tEXECUTE 'CREATE TRIGGER check\_auth BEFORE UPDATE OR DELETE ON '\\n\\t\\t|| quote\_ident(schema) || '.' || quote\_ident($2)\\n\\t\\t||' FOR EACH ROW EXECUTE PROCEDURE CheckAuthTrigger('\\n\\t\\t|| quote\_literal($3) || ')';\\n\\n\\tRETURN 0;\\nEND;\\n$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "checkauth",  
    "arguments": "text, text",  
    "return\_type": "integer",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.checkauth(text, text)\\n RETURNS integer\\n LANGUAGE sql\\nAS $function$ SELECT CheckAuth('', $1, $2) $function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "checkauthtrigger",  
    "arguments": "",  
    "return\_type": "trigger",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.checkauthtrigger()\\n RETURNS trigger\\n LANGUAGE c\\nAS '$libdir/postgis-3', $function$check\_authorization$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "contains\_2d",  
    "arguments": "box2df, geometry",  
    "return\_type": "boolean",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.contains\_2d(box2df, geometry)\\n RETURNS boolean\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/postgis-3', $function$gserialized\_contains\_box2df\_geom\_2d$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "contains\_2d",  
    "arguments": "geometry, box2df",  
    "return\_type": "boolean",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.contains\_2d(geometry, box2df)\\n RETURNS boolean\\n LANGUAGE sql\\n IMMUTABLE PARALLEL SAFE STRICT COST 1\\nAS $function$SELECT $2 OPERATOR(public.@) $1;$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "contains\_2d",  
    "arguments": "box2df, box2df",  
    "return\_type": "boolean",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.contains\_2d(box2df, box2df)\\n RETURNS boolean\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/postgis-3', $function$gserialized\_contains\_box2df\_box2df\_2d$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "cosine\_distance",  
    "arguments": "sparsevec, sparsevec",  
    "return\_type": "double precision",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.cosine\_distance(sparsevec, sparsevec)\\n RETURNS double precision\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/vector', $function$sparsevec\_cosine\_distance$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "cosine\_distance",  
    "arguments": "halfvec, halfvec",  
    "return\_type": "double precision",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.cosine\_distance(halfvec, halfvec)\\n RETURNS double precision\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/vector', $function$halfvec\_cosine\_distance$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "cosine\_distance",  
    "arguments": "vector, vector",  
    "return\_type": "double precision",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.cosine\_distance(vector, vector)\\n RETURNS double precision\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/vector', $function$cosine\_distance$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "disablelongtransactions",  
    "arguments": "",  
    "return\_type": "text",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.disablelongtransactions()\\n RETURNS text\\n LANGUAGE plpgsql\\nAS $function$\\nDECLARE\\n\\trec RECORD;\\n\\nBEGIN\\n\\n\\t--\\n\\t-- Drop all triggers applied by CheckAuth()\\n\\t--\\n\\tFOR rec IN\\n\\t\\tSELECT c.relname, t.tgname, t.tgargs FROM pg\_trigger t, pg\_class c, pg\_proc p\\n\\t\\tWHERE p.proname \= 'checkauthtrigger' and t.tgfoid \= p.oid and t.tgrelid \= c.oid\\n\\tLOOP\\n\\t\\tEXECUTE 'DROP TRIGGER ' || quote\_ident(rec.tgname) ||\\n\\t\\t\\t' ON ' || quote\_ident(rec.relname);\\n\\tEND LOOP;\\n\\n\\t--\\n\\t-- Drop the authorization\_table table\\n\\t--\\n\\tFOR rec IN SELECT \* FROM pg\_class WHERE relname \= 'authorization\_table' LOOP\\n\\t\\tDROP TABLE authorization\_table;\\n\\tEND LOOP;\\n\\n\\t--\\n\\t-- Drop the authorized\_tables view\\n\\t--\\n\\tFOR rec IN SELECT \* FROM pg\_class WHERE relname \= 'authorized\_tables' LOOP\\n\\t\\tDROP VIEW authorized\_tables;\\n\\tEND LOOP;\\n\\n\\tRETURN 'Long transactions support disabled';\\nEND;\\n$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "dropgeometrycolumn",  
    "arguments": "table\_name character varying, column\_name character varying",  
    "return\_type": "text",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.dropgeometrycolumn(table\_name character varying, column\_name character varying)\\n RETURNS text\\n LANGUAGE plpgsql\\n STRICT\\nAS $function$\\nDECLARE\\n\\tret text;\\nBEGIN\\n\\tSELECT public.DropGeometryColumn('','',$1,$2) into ret;\\n\\tRETURN ret;\\nEND;\\n$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "dropgeometrycolumn",  
    "arguments": "schema\_name character varying, table\_name character varying, column\_name character varying",  
    "return\_type": "text",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.dropgeometrycolumn(schema\_name character varying, table\_name character varying, column\_name character varying)\\n RETURNS text\\n LANGUAGE plpgsql\\n STRICT\\nAS $function$\\nDECLARE\\n\\tret text;\\nBEGIN\\n\\tSELECT public.DropGeometryColumn('',$1,$2,$3) into ret;\\n\\tRETURN ret;\\nEND;\\n$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "dropgeometrycolumn",  
    "arguments": "catalog\_name character varying, schema\_name character varying, table\_name character varying, column\_name character varying",  
    "return\_type": "text",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.dropgeometrycolumn(catalog\_name character varying, schema\_name character varying, table\_name character varying, column\_name character varying)\\n RETURNS text\\n LANGUAGE plpgsql\\n STRICT\\nAS $function$\\nDECLARE\\n\\tmyrec RECORD;\\n\\tokay boolean;\\n\\treal\_schema name;\\n\\nBEGIN\\n\\n\\t-- Find, check or fix schema\_name\\n\\tIF ( schema\_name \!= '' ) THEN\\n\\t\\tokay \= false;\\n\\n\\t\\tFOR myrec IN SELECT nspname FROM pg\_namespace WHERE text(nspname) \= schema\_name LOOP\\n\\t\\t\\tokay := true;\\n\\t\\tEND LOOP;\\n\\n\\t\\tIF ( okay \<\>  true ) THEN\\n\\t\\t\\tRAISE NOTICE 'Invalid schema name \- using current\_schema()';\\n\\t\\t\\tSELECT current\_schema() into real\_schema;\\n\\t\\tELSE\\n\\t\\t\\treal\_schema \= schema\_name;\\n\\t\\tEND IF;\\n\\tELSE\\n\\t\\tSELECT current\_schema() into real\_schema;\\n\\tEND IF;\\n\\n\\t-- Find out if the column is in the geometry\_columns table\\n\\tokay \= false;\\n\\tFOR myrec IN SELECT \* from public.geometry\_columns where f\_table\_schema \= text(real\_schema) and f\_table\_name \= table\_name and f\_geometry\_column \= column\_name LOOP\\n\\t\\tokay := true;\\n\\tEND LOOP;\\n\\tIF (okay \<\> true) THEN\\n\\t\\tRAISE EXCEPTION 'column not found in geometry\_columns table';\\n\\t\\tRETURN false;\\n\\tEND IF;\\n\\n\\t-- Remove table column\\n\\tEXECUTE 'ALTER TABLE ' || quote\_ident(real\_schema) || '.' ||\\n\\t\\tquote\_ident(table\_name) || ' DROP COLUMN ' ||\\n\\t\\tquote\_ident(column\_name);\\n\\n\\tRETURN real\_schema || '.' || table\_name || '.' || column\_name ||' effectively removed.';\\n\\nEND;\\n$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "dropgeometrytable",  
    "arguments": "table\_name character varying",  
    "return\_type": "text",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.dropgeometrytable(table\_name character varying)\\n RETURNS text\\n LANGUAGE sql\\n STRICT\\nAS $function$ SELECT public.DropGeometryTable('','',$1) $function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "dropgeometrytable",  
    "arguments": "catalog\_name character varying, schema\_name character varying, table\_name character varying",  
    "return\_type": "text",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.dropgeometrytable(catalog\_name character varying, schema\_name character varying, table\_name character varying)\\n RETURNS text\\n LANGUAGE plpgsql\\n STRICT\\nAS $function$\\nDECLARE\\n\\treal\_schema name;\\n\\nBEGIN\\n\\n\\tIF ( schema\_name \= '' ) THEN\\n\\t\\tSELECT current\_schema() into real\_schema;\\n\\tELSE\\n\\t\\treal\_schema \= schema\_name;\\n\\tEND IF;\\n\\n\\t-- TODO: Should we warn if table doesn't exist probably instead just saying dropped\\n\\t-- Remove table\\n\\tEXECUTE 'DROP TABLE IF EXISTS '\\n\\t\\t|| quote\_ident(real\_schema) || '.' ||\\n\\t\\tquote\_ident(table\_name) || ' RESTRICT';\\n\\n\\tRETURN\\n\\t\\treal\_schema || '.' ||\\n\\t\\ttable\_name ||' dropped.';\\n\\nEND;\\n$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "dropgeometrytable",  
    "arguments": "schema\_name character varying, table\_name character varying",  
    "return\_type": "text",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.dropgeometrytable(schema\_name character varying, table\_name character varying)\\n RETURNS text\\n LANGUAGE sql\\n STRICT\\nAS $function$ SELECT public.DropGeometryTable('',$1,$2) $function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "enablelongtransactions",  
    "arguments": "",  
    "return\_type": "text",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.enablelongtransactions()\\n RETURNS text\\n LANGUAGE plpgsql\\nAS $function$\\nDECLARE\\n\\t\\"query\\" text;\\n\\texists bool;\\n\\trec RECORD;\\n\\nBEGIN\\n\\n\\texists \= 'f';\\n\\tFOR rec IN SELECT \* FROM pg\_class WHERE relname \= 'authorization\_table'\\n\\tLOOP\\n\\t\\texists \= 't';\\n\\tEND LOOP;\\n\\n\\tIF NOT exists\\n\\tTHEN\\n\\t\\t\\"query\\" \= 'CREATE TABLE authorization\_table (\\n\\t\\t\\ttoid oid, \-- table oid\\n\\t\\t\\trid text, \-- row id\\n\\t\\t\\texpires timestamp,\\n\\t\\t\\tauthid text\\n\\t\\t)';\\n\\t\\tEXECUTE \\"query\\";\\n\\tEND IF;\\n\\n\\texists \= 'f';\\n\\tFOR rec IN SELECT \* FROM pg\_class WHERE relname \= 'authorized\_tables'\\n\\tLOOP\\n\\t\\texists \= 't';\\n\\tEND LOOP;\\n\\n\\tIF NOT exists THEN\\n\\t\\t\\"query\\" \= 'CREATE VIEW authorized\_tables AS ' ||\\n\\t\\t\\t'SELECT ' ||\\n\\t\\t\\t'n.nspname as schema, ' ||\\n\\t\\t\\t'c.relname as table, trim(' ||\\n\\t\\t\\tquote\_literal(chr(92) || '000') ||\\n\\t\\t\\t' from t.tgargs) as id\_column ' ||\\n\\t\\t\\t'FROM pg\_trigger t, pg\_class c, pg\_proc p ' ||\\n\\t\\t\\t', pg\_namespace n ' ||\\n\\t\\t\\t'WHERE p.proname \= ' || quote\_literal('checkauthtrigger') ||\\n\\t\\t\\t' AND c.relnamespace \= n.oid' ||\\n\\t\\t\\t' AND t.tgfoid \= p.oid and t.tgrelid \= c.oid';\\n\\t\\tEXECUTE \\"query\\";\\n\\tEND IF;\\n\\n\\tRETURN 'Long transactions support enabled';\\nEND;\\n$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "equals",  
    "arguments": "geom1 geometry, geom2 geometry",  
    "return\_type": "boolean",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.equals(geom1 geometry, geom2 geometry)\\n RETURNS boolean\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 500\\nAS '$libdir/postgis-3', $function$ST\_Equals$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "find\_srid",  
    "arguments": "character varying, character varying, character varying",  
    "return\_type": "integer",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.find\_srid(character varying, character varying, character varying)\\n RETURNS integer\\n LANGUAGE plpgsql\\n STABLE PARALLEL SAFE STRICT\\nAS $function$\\nDECLARE\\n\\tschem varchar \=  $1;\\n\\ttabl varchar \= $2;\\n\\tsr int4;\\nBEGIN\\n-- if the table contains a . and the schema is empty\\n-- split the table into a schema and a table\\n-- otherwise drop through to default behavior\\n\\tIF ( schem \= '' and strpos(tabl,'.') \> 0 ) THEN\\n\\t schem \= substr(tabl,1,strpos(tabl,'.')-1);\\n\\t tabl \= substr(tabl,length(schem)+2);\\n\\tEND IF;\\n\\n\\tselect SRID into sr from public.geometry\_columns where (f\_table\_schema \= schem or schem \= '') and f\_table\_name \= tabl and f\_geometry\_column \= $3;\\n\\tIF NOT FOUND THEN\\n\\t   RAISE EXCEPTION 'find\_srid() \- could not find the corresponding SRID \- is the geometry registered in the GEOMETRY\_COLUMNS table?  Is there an uppercase/lowercase mismatch?';\\n\\tEND IF;\\n\\treturn sr;\\nEND;\\n$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "geog\_brin\_inclusion\_add\_value",  
    "arguments": "internal, internal, internal, internal",  
    "return\_type": "boolean",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.geog\_brin\_inclusion\_add\_value(internal, internal, internal, internal)\\n RETURNS boolean\\n LANGUAGE c\\nAS '$libdir/postgis-3', $function$geog\_brin\_inclusion\_add\_value$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "geography",  
    "arguments": "bytea",  
    "return\_type": "geography",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.geography(bytea)\\n RETURNS geography\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/postgis-3', $function$geography\_from\_binary$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "geography",  
    "arguments": "geography, integer, boolean",  
    "return\_type": "geography",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.geography(geography, integer, boolean)\\n RETURNS geography\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/postgis-3', $function$geography\_enforce\_typmod$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "geography",  
    "arguments": "geometry",  
    "return\_type": "geography",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.geography(geometry)\\n RETURNS geography\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/postgis-3', $function$geography\_from\_geometry$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "geography\_analyze",  
    "arguments": "internal",  
    "return\_type": "boolean",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.geography\_analyze(internal)\\n RETURNS boolean\\n LANGUAGE c\\n STRICT\\nAS '$libdir/postgis-3', $function$gserialized\_analyze\_nd$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "geography\_cmp",  
    "arguments": "geography, geography",  
    "return\_type": "integer",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.geography\_cmp(geography, geography)\\n RETURNS integer\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/postgis-3', $function$geography\_cmp$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "geography\_distance\_knn",  
    "arguments": "geography, geography",  
    "return\_type": "double precision",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.geography\_distance\_knn(geography, geography)\\n RETURNS double precision\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 100\\nAS '$libdir/postgis-3', $function$geography\_distance\_knn$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "geography\_eq",  
    "arguments": "geography, geography",  
    "return\_type": "boolean",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.geography\_eq(geography, geography)\\n RETURNS boolean\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/postgis-3', $function$geography\_eq$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "geography\_ge",  
    "arguments": "geography, geography",  
    "return\_type": "boolean",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.geography\_ge(geography, geography)\\n RETURNS boolean\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/postgis-3', $function$geography\_ge$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "geography\_gist\_compress",  
    "arguments": "internal",  
    "return\_type": "internal",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.geography\_gist\_compress(internal)\\n RETURNS internal\\n LANGUAGE c\\nAS '$libdir/postgis-3', $function$gserialized\_gist\_compress$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "geography\_gist\_consistent",  
    "arguments": "internal, geography, integer",  
    "return\_type": "boolean",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.geography\_gist\_consistent(internal, geography, integer)\\n RETURNS boolean\\n LANGUAGE c\\nAS '$libdir/postgis-3', $function$gserialized\_gist\_consistent$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "geography\_gist\_decompress",  
    "arguments": "internal",  
    "return\_type": "internal",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.geography\_gist\_decompress(internal)\\n RETURNS internal\\n LANGUAGE c\\nAS '$libdir/postgis-3', $function$gserialized\_gist\_decompress$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "geography\_gist\_distance",  
    "arguments": "internal, geography, integer",  
    "return\_type": "double precision",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.geography\_gist\_distance(internal, geography, integer)\\n RETURNS double precision\\n LANGUAGE c\\nAS '$libdir/postgis-3', $function$gserialized\_gist\_geog\_distance$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "geography\_gist\_penalty",  
    "arguments": "internal, internal, internal",  
    "return\_type": "internal",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.geography\_gist\_penalty(internal, internal, internal)\\n RETURNS internal\\n LANGUAGE c\\nAS '$libdir/postgis-3', $function$gserialized\_gist\_penalty$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "geography\_gist\_picksplit",  
    "arguments": "internal, internal",  
    "return\_type": "internal",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.geography\_gist\_picksplit(internal, internal)\\n RETURNS internal\\n LANGUAGE c\\nAS '$libdir/postgis-3', $function$gserialized\_gist\_picksplit$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "geography\_gist\_same",  
    "arguments": "box2d, box2d, internal",  
    "return\_type": "internal",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.geography\_gist\_same(box2d, box2d, internal)\\n RETURNS internal\\n LANGUAGE c\\nAS '$libdir/postgis-3', $function$gserialized\_gist\_same$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "geography\_gist\_union",  
    "arguments": "bytea, internal",  
    "return\_type": "internal",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.geography\_gist\_union(bytea, internal)\\n RETURNS internal\\n LANGUAGE c\\nAS '$libdir/postgis-3', $function$gserialized\_gist\_union$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "geography\_gt",  
    "arguments": "geography, geography",  
    "return\_type": "boolean",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.geography\_gt(geography, geography)\\n RETURNS boolean\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/postgis-3', $function$geography\_gt$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "geography\_in",  
    "arguments": "cstring, oid, integer",  
    "return\_type": "geography",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.geography\_in(cstring, oid, integer)\\n RETURNS geography\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/postgis-3', $function$geography\_in$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "geography\_le",  
    "arguments": "geography, geography",  
    "return\_type": "boolean",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.geography\_le(geography, geography)\\n RETURNS boolean\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/postgis-3', $function$geography\_le$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "geography\_lt",  
    "arguments": "geography, geography",  
    "return\_type": "boolean",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.geography\_lt(geography, geography)\\n RETURNS boolean\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/postgis-3', $function$geography\_lt$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "geography\_out",  
    "arguments": "geography",  
    "return\_type": "cstring",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.geography\_out(geography)\\n RETURNS cstring\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/postgis-3', $function$geography\_out$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "geography\_overlaps",  
    "arguments": "geography, geography",  
    "return\_type": "boolean",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.geography\_overlaps(geography, geography)\\n RETURNS boolean\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/postgis-3', $function$gserialized\_overlaps$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "geography\_recv",  
    "arguments": "internal, oid, integer",  
    "return\_type": "geography",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.geography\_recv(internal, oid, integer)\\n RETURNS geography\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/postgis-3', $function$geography\_recv$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "geography\_send",  
    "arguments": "geography",  
    "return\_type": "bytea",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.geography\_send(geography)\\n RETURNS bytea\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/postgis-3', $function$geography\_send$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "geography\_spgist\_choose\_nd",  
    "arguments": "internal, internal",  
    "return\_type": "void",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.geography\_spgist\_choose\_nd(internal, internal)\\n RETURNS void\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/postgis-3', $function$gserialized\_spgist\_choose\_nd$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "geography\_spgist\_compress\_nd",  
    "arguments": "internal",  
    "return\_type": "internal",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.geography\_spgist\_compress\_nd(internal)\\n RETURNS internal\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/postgis-3', $function$gserialized\_spgist\_compress\_nd$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "geography\_spgist\_config\_nd",  
    "arguments": "internal, internal",  
    "return\_type": "void",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.geography\_spgist\_config\_nd(internal, internal)\\n RETURNS void\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/postgis-3', $function$gserialized\_spgist\_config\_nd$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "geography\_spgist\_inner\_consistent\_nd",  
    "arguments": "internal, internal",  
    "return\_type": "void",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.geography\_spgist\_inner\_consistent\_nd(internal, internal)\\n RETURNS void\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/postgis-3', $function$gserialized\_spgist\_inner\_consistent\_nd$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "geography\_spgist\_leaf\_consistent\_nd",  
    "arguments": "internal, internal",  
    "return\_type": "boolean",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.geography\_spgist\_leaf\_consistent\_nd(internal, internal)\\n RETURNS boolean\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/postgis-3', $function$gserialized\_spgist\_leaf\_consistent\_nd$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "geography\_spgist\_picksplit\_nd",  
    "arguments": "internal, internal",  
    "return\_type": "void",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.geography\_spgist\_picksplit\_nd(internal, internal)\\n RETURNS void\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/postgis-3', $function$gserialized\_spgist\_picksplit\_nd$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "geography\_typmod\_in",  
    "arguments": "cstring\[\]",  
    "return\_type": "integer",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.geography\_typmod\_in(cstring\[\])\\n RETURNS integer\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/postgis-3', $function$geography\_typmod\_in$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "geography\_typmod\_out",  
    "arguments": "integer",  
    "return\_type": "cstring",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.geography\_typmod\_out(integer)\\n RETURNS cstring\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/postgis-3', $function$postgis\_typmod\_out$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "geom2d\_brin\_inclusion\_add\_value",  
    "arguments": "internal, internal, internal, internal",  
    "return\_type": "boolean",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.geom2d\_brin\_inclusion\_add\_value(internal, internal, internal, internal)\\n RETURNS boolean\\n LANGUAGE c\\n PARALLEL SAFE\\nAS '$libdir/postgis-3', $function$geom2d\_brin\_inclusion\_add\_value$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "geom3d\_brin\_inclusion\_add\_value",  
    "arguments": "internal, internal, internal, internal",  
    "return\_type": "boolean",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.geom3d\_brin\_inclusion\_add\_value(internal, internal, internal, internal)\\n RETURNS boolean\\n LANGUAGE c\\n PARALLEL SAFE\\nAS '$libdir/postgis-3', $function$geom3d\_brin\_inclusion\_add\_value$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "geom4d\_brin\_inclusion\_add\_value",  
    "arguments": "internal, internal, internal, internal",  
    "return\_type": "boolean",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.geom4d\_brin\_inclusion\_add\_value(internal, internal, internal, internal)\\n RETURNS boolean\\n LANGUAGE c\\n PARALLEL SAFE\\nAS '$libdir/postgis-3', $function$geom4d\_brin\_inclusion\_add\_value$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "geometry",  
    "arguments": "polygon",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.geometry(polygon)\\n RETURNS geometry\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/postgis-3', $function$polygon\_to\_geometry$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "geometry",  
    "arguments": "geometry, integer, boolean",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.geometry(geometry, integer, boolean)\\n RETURNS geometry\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/postgis-3', $function$geometry\_enforce\_typmod$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "geometry",  
    "arguments": "bytea",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.geometry(bytea)\\n RETURNS geometry\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 50\\nAS '$libdir/postgis-3', $function$LWGEOM\_from\_bytea$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "geometry",  
    "arguments": "text",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.geometry(text)\\n RETURNS geometry\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 50\\nAS '$libdir/postgis-3', $function$parse\_WKT\_lwgeom$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "geometry",  
    "arguments": "box3d",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.geometry(box3d)\\n RETURNS geometry\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 50\\nAS '$libdir/postgis-3', $function$BOX3D\_to\_LWGEOM$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "geometry",  
    "arguments": "box2d",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.geometry(box2d)\\n RETURNS geometry\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 50\\nAS '$libdir/postgis-3', $function$BOX2D\_to\_LWGEOM$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "geometry",  
    "arguments": "point",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.geometry(point)\\n RETURNS geometry\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/postgis-3', $function$point\_to\_geometry$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "geometry",  
    "arguments": "geography",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.geometry(geography)\\n RETURNS geometry\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/postgis-3', $function$geometry\_from\_geography$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "geometry",  
    "arguments": "path",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.geometry(path)\\n RETURNS geometry\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/postgis-3', $function$path\_to\_geometry$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "geometry\_above",  
    "arguments": "geom1 geometry, geom2 geometry",  
    "return\_type": "boolean",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.geometry\_above(geom1 geometry, geom2 geometry)\\n RETURNS boolean\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/postgis-3', $function$gserialized\_above\_2d$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "geometry\_analyze",  
    "arguments": "internal",  
    "return\_type": "boolean",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.geometry\_analyze(internal)\\n RETURNS boolean\\n LANGUAGE c\\n STRICT\\nAS '$libdir/postgis-3', $function$gserialized\_analyze\_nd$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "geometry\_below",  
    "arguments": "geom1 geometry, geom2 geometry",  
    "return\_type": "boolean",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.geometry\_below(geom1 geometry, geom2 geometry)\\n RETURNS boolean\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/postgis-3', $function$gserialized\_below\_2d$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "geometry\_cmp",  
    "arguments": "geom1 geometry, geom2 geometry",  
    "return\_type": "integer",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.geometry\_cmp(geom1 geometry, geom2 geometry)\\n RETURNS integer\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/postgis-3', $function$lwgeom\_cmp$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "geometry\_contained\_3d",  
    "arguments": "geom1 geometry, geom2 geometry",  
    "return\_type": "boolean",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.geometry\_contained\_3d(geom1 geometry, geom2 geometry)\\n RETURNS boolean\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/postgis-3', $function$gserialized\_contained\_3d$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "geometry\_contains",  
    "arguments": "geom1 geometry, geom2 geometry",  
    "return\_type": "boolean",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.geometry\_contains(geom1 geometry, geom2 geometry)\\n RETURNS boolean\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/postgis-3', $function$gserialized\_contains\_2d$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "geometry\_contains\_3d",  
    "arguments": "geom1 geometry, geom2 geometry",  
    "return\_type": "boolean",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.geometry\_contains\_3d(geom1 geometry, geom2 geometry)\\n RETURNS boolean\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/postgis-3', $function$gserialized\_contains\_3d$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "geometry\_contains\_nd",  
    "arguments": "geometry, geometry",  
    "return\_type": "boolean",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.geometry\_contains\_nd(geometry, geometry)\\n RETURNS boolean\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/postgis-3', $function$gserialized\_contains$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "geometry\_distance\_box",  
    "arguments": "geom1 geometry, geom2 geometry",  
    "return\_type": "double precision",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.geometry\_distance\_box(geom1 geometry, geom2 geometry)\\n RETURNS double precision\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/postgis-3', $function$gserialized\_distance\_box\_2d$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "geometry\_distance\_centroid",  
    "arguments": "geom1 geometry, geom2 geometry",  
    "return\_type": "double precision",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.geometry\_distance\_centroid(geom1 geometry, geom2 geometry)\\n RETURNS double precision\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 500\\nAS '$libdir/postgis-3', $function$ST\_Distance$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "geometry\_distance\_centroid\_nd",  
    "arguments": "geometry, geometry",  
    "return\_type": "double precision",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.geometry\_distance\_centroid\_nd(geometry, geometry)\\n RETURNS double precision\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/postgis-3', $function$gserialized\_distance\_nd$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "geometry\_distance\_cpa",  
    "arguments": "geometry, geometry",  
    "return\_type": "double precision",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.geometry\_distance\_cpa(geometry, geometry)\\n RETURNS double precision\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 10000\\nAS '$libdir/postgis-3', $function$ST\_DistanceCPA$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "geometry\_eq",  
    "arguments": "geom1 geometry, geom2 geometry",  
    "return\_type": "boolean",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.geometry\_eq(geom1 geometry, geom2 geometry)\\n RETURNS boolean\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/postgis-3', $function$lwgeom\_eq$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "geometry\_ge",  
    "arguments": "geom1 geometry, geom2 geometry",  
    "return\_type": "boolean",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.geometry\_ge(geom1 geometry, geom2 geometry)\\n RETURNS boolean\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/postgis-3', $function$lwgeom\_ge$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "geometry\_gist\_compress\_2d",  
    "arguments": "internal",  
    "return\_type": "internal",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.geometry\_gist\_compress\_2d(internal)\\n RETURNS internal\\n LANGUAGE c\\n PARALLEL SAFE\\nAS '$libdir/postgis-3', $function$gserialized\_gist\_compress\_2d$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "geometry\_gist\_compress\_nd",  
    "arguments": "internal",  
    "return\_type": "internal",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.geometry\_gist\_compress\_nd(internal)\\n RETURNS internal\\n LANGUAGE c\\n PARALLEL SAFE\\nAS '$libdir/postgis-3', $function$gserialized\_gist\_compress$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "geometry\_gist\_consistent\_2d",  
    "arguments": "internal, geometry, integer",  
    "return\_type": "boolean",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.geometry\_gist\_consistent\_2d(internal, geometry, integer)\\n RETURNS boolean\\n LANGUAGE c\\n PARALLEL SAFE\\nAS '$libdir/postgis-3', $function$gserialized\_gist\_consistent\_2d$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "geometry\_gist\_consistent\_nd",  
    "arguments": "internal, geometry, integer",  
    "return\_type": "boolean",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.geometry\_gist\_consistent\_nd(internal, geometry, integer)\\n RETURNS boolean\\n LANGUAGE c\\n PARALLEL SAFE\\nAS '$libdir/postgis-3', $function$gserialized\_gist\_consistent$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "geometry\_gist\_decompress\_2d",  
    "arguments": "internal",  
    "return\_type": "internal",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.geometry\_gist\_decompress\_2d(internal)\\n RETURNS internal\\n LANGUAGE c\\n PARALLEL SAFE\\nAS '$libdir/postgis-3', $function$gserialized\_gist\_decompress\_2d$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "geometry\_gist\_decompress\_nd",  
    "arguments": "internal",  
    "return\_type": "internal",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.geometry\_gist\_decompress\_nd(internal)\\n RETURNS internal\\n LANGUAGE c\\n PARALLEL SAFE\\nAS '$libdir/postgis-3', $function$gserialized\_gist\_decompress$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "geometry\_gist\_distance\_2d",  
    "arguments": "internal, geometry, integer",  
    "return\_type": "double precision",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.geometry\_gist\_distance\_2d(internal, geometry, integer)\\n RETURNS double precision\\n LANGUAGE c\\n PARALLEL SAFE\\nAS '$libdir/postgis-3', $function$gserialized\_gist\_distance\_2d$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "geometry\_gist\_distance\_nd",  
    "arguments": "internal, geometry, integer",  
    "return\_type": "double precision",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.geometry\_gist\_distance\_nd(internal, geometry, integer)\\n RETURNS double precision\\n LANGUAGE c\\n PARALLEL SAFE\\nAS '$libdir/postgis-3', $function$gserialized\_gist\_distance$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "geometry\_gist\_penalty\_2d",  
    "arguments": "internal, internal, internal",  
    "return\_type": "internal",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.geometry\_gist\_penalty\_2d(internal, internal, internal)\\n RETURNS internal\\n LANGUAGE c\\n PARALLEL SAFE\\nAS '$libdir/postgis-3', $function$gserialized\_gist\_penalty\_2d$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "geometry\_gist\_penalty\_nd",  
    "arguments": "internal, internal, internal",  
    "return\_type": "internal",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.geometry\_gist\_penalty\_nd(internal, internal, internal)\\n RETURNS internal\\n LANGUAGE c\\n PARALLEL SAFE\\nAS '$libdir/postgis-3', $function$gserialized\_gist\_penalty$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "geometry\_gist\_picksplit\_2d",  
    "arguments": "internal, internal",  
    "return\_type": "internal",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.geometry\_gist\_picksplit\_2d(internal, internal)\\n RETURNS internal\\n LANGUAGE c\\n PARALLEL SAFE\\nAS '$libdir/postgis-3', $function$gserialized\_gist\_picksplit\_2d$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "geometry\_gist\_picksplit\_nd",  
    "arguments": "internal, internal",  
    "return\_type": "internal",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.geometry\_gist\_picksplit\_nd(internal, internal)\\n RETURNS internal\\n LANGUAGE c\\n PARALLEL SAFE\\nAS '$libdir/postgis-3', $function$gserialized\_gist\_picksplit$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "geometry\_gist\_same\_2d",  
    "arguments": "geom1 geometry, geom2 geometry, internal",  
    "return\_type": "internal",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.geometry\_gist\_same\_2d(geom1 geometry, geom2 geometry, internal)\\n RETURNS internal\\n LANGUAGE c\\n PARALLEL SAFE\\nAS '$libdir/postgis-3', $function$gserialized\_gist\_same\_2d$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "geometry\_gist\_same\_nd",  
    "arguments": "geometry, geometry, internal",  
    "return\_type": "internal",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.geometry\_gist\_same\_nd(geometry, geometry, internal)\\n RETURNS internal\\n LANGUAGE c\\n PARALLEL SAFE\\nAS '$libdir/postgis-3', $function$gserialized\_gist\_same$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "geometry\_gist\_sortsupport\_2d",  
    "arguments": "internal",  
    "return\_type": "void",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.geometry\_gist\_sortsupport\_2d(internal)\\n RETURNS void\\n LANGUAGE c\\n STRICT\\nAS '$libdir/postgis-3', $function$gserialized\_gist\_sortsupport\_2d$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "geometry\_gist\_union\_2d",  
    "arguments": "bytea, internal",  
    "return\_type": "internal",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.geometry\_gist\_union\_2d(bytea, internal)\\n RETURNS internal\\n LANGUAGE c\\n PARALLEL SAFE\\nAS '$libdir/postgis-3', $function$gserialized\_gist\_union\_2d$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "geometry\_gist\_union\_nd",  
    "arguments": "bytea, internal",  
    "return\_type": "internal",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.geometry\_gist\_union\_nd(bytea, internal)\\n RETURNS internal\\n LANGUAGE c\\n PARALLEL SAFE\\nAS '$libdir/postgis-3', $function$gserialized\_gist\_union$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "geometry\_gt",  
    "arguments": "geom1 geometry, geom2 geometry",  
    "return\_type": "boolean",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.geometry\_gt(geom1 geometry, geom2 geometry)\\n RETURNS boolean\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/postgis-3', $function$lwgeom\_gt$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "geometry\_hash",  
    "arguments": "geometry",  
    "return\_type": "integer",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.geometry\_hash(geometry)\\n RETURNS integer\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/postgis-3', $function$lwgeom\_hash$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "geometry\_in",  
    "arguments": "cstring",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.geometry\_in(cstring)\\n RETURNS geometry\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/postgis-3', $function$LWGEOM\_in$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "geometry\_le",  
    "arguments": "geom1 geometry, geom2 geometry",  
    "return\_type": "boolean",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.geometry\_le(geom1 geometry, geom2 geometry)\\n RETURNS boolean\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/postgis-3', $function$lwgeom\_le$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "geometry\_left",  
    "arguments": "geom1 geometry, geom2 geometry",  
    "return\_type": "boolean",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.geometry\_left(geom1 geometry, geom2 geometry)\\n RETURNS boolean\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/postgis-3', $function$gserialized\_left\_2d$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "geometry\_lt",  
    "arguments": "geom1 geometry, geom2 geometry",  
    "return\_type": "boolean",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.geometry\_lt(geom1 geometry, geom2 geometry)\\n RETURNS boolean\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/postgis-3', $function$lwgeom\_lt$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "geometry\_out",  
    "arguments": "geometry",  
    "return\_type": "cstring",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.geometry\_out(geometry)\\n RETURNS cstring\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/postgis-3', $function$LWGEOM\_out$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "geometry\_overabove",  
    "arguments": "geom1 geometry, geom2 geometry",  
    "return\_type": "boolean",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.geometry\_overabove(geom1 geometry, geom2 geometry)\\n RETURNS boolean\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/postgis-3', $function$gserialized\_overabove\_2d$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "geometry\_overbelow",  
    "arguments": "geom1 geometry, geom2 geometry",  
    "return\_type": "boolean",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.geometry\_overbelow(geom1 geometry, geom2 geometry)\\n RETURNS boolean\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/postgis-3', $function$gserialized\_overbelow\_2d$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "geometry\_overlaps",  
    "arguments": "geom1 geometry, geom2 geometry",  
    "return\_type": "boolean",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.geometry\_overlaps(geom1 geometry, geom2 geometry)\\n RETURNS boolean\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/postgis-3', $function$gserialized\_overlaps\_2d$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "geometry\_overlaps\_3d",  
    "arguments": "geom1 geometry, geom2 geometry",  
    "return\_type": "boolean",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.geometry\_overlaps\_3d(geom1 geometry, geom2 geometry)\\n RETURNS boolean\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/postgis-3', $function$gserialized\_overlaps\_3d$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "geometry\_overlaps\_nd",  
    "arguments": "geometry, geometry",  
    "return\_type": "boolean",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.geometry\_overlaps\_nd(geometry, geometry)\\n RETURNS boolean\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/postgis-3', $function$gserialized\_overlaps$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "geometry\_overleft",  
    "arguments": "geom1 geometry, geom2 geometry",  
    "return\_type": "boolean",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.geometry\_overleft(geom1 geometry, geom2 geometry)\\n RETURNS boolean\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/postgis-3', $function$gserialized\_overleft\_2d$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "geometry\_overright",  
    "arguments": "geom1 geometry, geom2 geometry",  
    "return\_type": "boolean",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.geometry\_overright(geom1 geometry, geom2 geometry)\\n RETURNS boolean\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/postgis-3', $function$gserialized\_overright\_2d$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "geometry\_recv",  
    "arguments": "internal",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.geometry\_recv(internal)\\n RETURNS geometry\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/postgis-3', $function$LWGEOM\_recv$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "geometry\_right",  
    "arguments": "geom1 geometry, geom2 geometry",  
    "return\_type": "boolean",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.geometry\_right(geom1 geometry, geom2 geometry)\\n RETURNS boolean\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/postgis-3', $function$gserialized\_right\_2d$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "geometry\_same",  
    "arguments": "geom1 geometry, geom2 geometry",  
    "return\_type": "boolean",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.geometry\_same(geom1 geometry, geom2 geometry)\\n RETURNS boolean\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/postgis-3', $function$gserialized\_same\_2d$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "geometry\_same\_3d",  
    "arguments": "geom1 geometry, geom2 geometry",  
    "return\_type": "boolean",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.geometry\_same\_3d(geom1 geometry, geom2 geometry)\\n RETURNS boolean\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/postgis-3', $function$gserialized\_same\_3d$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "geometry\_same\_nd",  
    "arguments": "geometry, geometry",  
    "return\_type": "boolean",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.geometry\_same\_nd(geometry, geometry)\\n RETURNS boolean\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/postgis-3', $function$gserialized\_same$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "geometry\_send",  
    "arguments": "geometry",  
    "return\_type": "bytea",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.geometry\_send(geometry)\\n RETURNS bytea\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/postgis-3', $function$LWGEOM\_send$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "geometry\_sortsupport",  
    "arguments": "internal",  
    "return\_type": "void",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.geometry\_sortsupport(internal)\\n RETURNS void\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/postgis-3', $function$lwgeom\_sortsupport$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "geometry\_spgist\_choose\_2d",  
    "arguments": "internal, internal",  
    "return\_type": "void",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.geometry\_spgist\_choose\_2d(internal, internal)\\n RETURNS void\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/postgis-3', $function$gserialized\_spgist\_choose\_2d$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "geometry\_spgist\_choose\_3d",  
    "arguments": "internal, internal",  
    "return\_type": "void",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.geometry\_spgist\_choose\_3d(internal, internal)\\n RETURNS void\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/postgis-3', $function$gserialized\_spgist\_choose\_3d$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "geometry\_spgist\_choose\_nd",  
    "arguments": "internal, internal",  
    "return\_type": "void",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.geometry\_spgist\_choose\_nd(internal, internal)\\n RETURNS void\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/postgis-3', $function$gserialized\_spgist\_choose\_nd$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "geometry\_spgist\_compress\_2d",  
    "arguments": "internal",  
    "return\_type": "internal",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.geometry\_spgist\_compress\_2d(internal)\\n RETURNS internal\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/postgis-3', $function$gserialized\_spgist\_compress\_2d$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "geometry\_spgist\_compress\_3d",  
    "arguments": "internal",  
    "return\_type": "internal",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.geometry\_spgist\_compress\_3d(internal)\\n RETURNS internal\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/postgis-3', $function$gserialized\_spgist\_compress\_3d$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "geometry\_spgist\_compress\_nd",  
    "arguments": "internal",  
    "return\_type": "internal",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.geometry\_spgist\_compress\_nd(internal)\\n RETURNS internal\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/postgis-3', $function$gserialized\_spgist\_compress\_nd$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "geometry\_spgist\_config\_2d",  
    "arguments": "internal, internal",  
    "return\_type": "void",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.geometry\_spgist\_config\_2d(internal, internal)\\n RETURNS void\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/postgis-3', $function$gserialized\_spgist\_config\_2d$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "geometry\_spgist\_config\_3d",  
    "arguments": "internal, internal",  
    "return\_type": "void",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.geometry\_spgist\_config\_3d(internal, internal)\\n RETURNS void\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/postgis-3', $function$gserialized\_spgist\_config\_3d$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "geometry\_spgist\_config\_nd",  
    "arguments": "internal, internal",  
    "return\_type": "void",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.geometry\_spgist\_config\_nd(internal, internal)\\n RETURNS void\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/postgis-3', $function$gserialized\_spgist\_config\_nd$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "geometry\_spgist\_inner\_consistent\_2d",  
    "arguments": "internal, internal",  
    "return\_type": "void",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.geometry\_spgist\_inner\_consistent\_2d(internal, internal)\\n RETURNS void\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/postgis-3', $function$gserialized\_spgist\_inner\_consistent\_2d$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "geometry\_spgist\_inner\_consistent\_3d",  
    "arguments": "internal, internal",  
    "return\_type": "void",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.geometry\_spgist\_inner\_consistent\_3d(internal, internal)\\n RETURNS void\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/postgis-3', $function$gserialized\_spgist\_inner\_consistent\_3d$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "geometry\_spgist\_inner\_consistent\_nd",  
    "arguments": "internal, internal",  
    "return\_type": "void",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.geometry\_spgist\_inner\_consistent\_nd(internal, internal)\\n RETURNS void\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/postgis-3', $function$gserialized\_spgist\_inner\_consistent\_nd$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "geometry\_spgist\_leaf\_consistent\_2d",  
    "arguments": "internal, internal",  
    "return\_type": "boolean",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.geometry\_spgist\_leaf\_consistent\_2d(internal, internal)\\n RETURNS boolean\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/postgis-3', $function$gserialized\_spgist\_leaf\_consistent\_2d$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "geometry\_spgist\_leaf\_consistent\_3d",  
    "arguments": "internal, internal",  
    "return\_type": "boolean",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.geometry\_spgist\_leaf\_consistent\_3d(internal, internal)\\n RETURNS boolean\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/postgis-3', $function$gserialized\_spgist\_leaf\_consistent\_3d$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "geometry\_spgist\_leaf\_consistent\_nd",  
    "arguments": "internal, internal",  
    "return\_type": "boolean",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.geometry\_spgist\_leaf\_consistent\_nd(internal, internal)\\n RETURNS boolean\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/postgis-3', $function$gserialized\_spgist\_leaf\_consistent\_nd$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "geometry\_spgist\_picksplit\_2d",  
    "arguments": "internal, internal",  
    "return\_type": "void",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.geometry\_spgist\_picksplit\_2d(internal, internal)\\n RETURNS void\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/postgis-3', $function$gserialized\_spgist\_picksplit\_2d$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "geometry\_spgist\_picksplit\_3d",  
    "arguments": "internal, internal",  
    "return\_type": "void",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.geometry\_spgist\_picksplit\_3d(internal, internal)\\n RETURNS void\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/postgis-3', $function$gserialized\_spgist\_picksplit\_3d$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "geometry\_spgist\_picksplit\_nd",  
    "arguments": "internal, internal",  
    "return\_type": "void",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.geometry\_spgist\_picksplit\_nd(internal, internal)\\n RETURNS void\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/postgis-3', $function$gserialized\_spgist\_picksplit\_nd$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "geometry\_typmod\_in",  
    "arguments": "cstring\[\]",  
    "return\_type": "integer",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.geometry\_typmod\_in(cstring\[\])\\n RETURNS integer\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/postgis-3', $function$geometry\_typmod\_in$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "geometry\_typmod\_out",  
    "arguments": "integer",  
    "return\_type": "cstring",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.geometry\_typmod\_out(integer)\\n RETURNS cstring\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/postgis-3', $function$postgis\_typmod\_out$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "geometry\_within",  
    "arguments": "geom1 geometry, geom2 geometry",  
    "return\_type": "boolean",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.geometry\_within(geom1 geometry, geom2 geometry)\\n RETURNS boolean\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/postgis-3', $function$gserialized\_within\_2d$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "geometry\_within\_nd",  
    "arguments": "geometry, geometry",  
    "return\_type": "boolean",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.geometry\_within\_nd(geometry, geometry)\\n RETURNS boolean\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/postgis-3', $function$gserialized\_within$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "geometrytype",  
    "arguments": "geometry",  
    "return\_type": "text",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.geometrytype(geometry)\\n RETURNS text\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/postgis-3', $function$LWGEOM\_getTYPE$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "geometrytype",  
    "arguments": "geography",  
    "return\_type": "text",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.geometrytype(geography)\\n RETURNS text\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/postgis-3', $function$LWGEOM\_getTYPE$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "geomfromewkb",  
    "arguments": "bytea",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.geomfromewkb(bytea)\\n RETURNS geometry\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 50\\nAS '$libdir/postgis-3', $function$LWGEOMFromEWKB$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "geomfromewkt",  
    "arguments": "text",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.geomfromewkt(text)\\n RETURNS geometry\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 50\\nAS '$libdir/postgis-3', $function$parse\_WKT\_lwgeom$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "get\_proj4\_from\_srid",  
    "arguments": "integer",  
    "return\_type": "text",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.get\_proj4\_from\_srid(integer)\\n RETURNS text\\n LANGUAGE plpgsql\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS $function$\\n\\tBEGIN\\n\\tRETURN proj4text::text FROM public.spatial\_ref\_sys WHERE srid= $1;\\n\\tEND;\\n\\t$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "gettransactionid",  
    "arguments": "",  
    "return\_type": "xid",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.gettransactionid()\\n RETURNS xid\\n LANGUAGE c\\nAS '$libdir/postgis-3', $function$getTransactionID$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "gidx\_in",  
    "arguments": "cstring",  
    "return\_type": "gidx",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.gidx\_in(cstring)\\n RETURNS gidx\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/postgis-3', $function$gidx\_in$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "gidx\_out",  
    "arguments": "gidx",  
    "return\_type": "cstring",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.gidx\_out(gidx)\\n RETURNS cstring\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/postgis-3', $function$gidx\_out$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "gserialized\_gist\_joinsel\_2d",  
    "arguments": "internal, oid, internal, smallint",  
    "return\_type": "double precision",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.gserialized\_gist\_joinsel\_2d(internal, oid, internal, smallint)\\n RETURNS double precision\\n LANGUAGE c\\n PARALLEL SAFE\\nAS '$libdir/postgis-3', $function$gserialized\_gist\_joinsel\_2d$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "gserialized\_gist\_joinsel\_nd",  
    "arguments": "internal, oid, internal, smallint",  
    "return\_type": "double precision",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.gserialized\_gist\_joinsel\_nd(internal, oid, internal, smallint)\\n RETURNS double precision\\n LANGUAGE c\\n PARALLEL SAFE\\nAS '$libdir/postgis-3', $function$gserialized\_gist\_joinsel\_nd$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "gserialized\_gist\_sel\_2d",  
    "arguments": "internal, oid, internal, integer",  
    "return\_type": "double precision",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.gserialized\_gist\_sel\_2d(internal, oid, internal, integer)\\n RETURNS double precision\\n LANGUAGE c\\n PARALLEL SAFE\\nAS '$libdir/postgis-3', $function$gserialized\_gist\_sel\_2d$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "gserialized\_gist\_sel\_nd",  
    "arguments": "internal, oid, internal, integer",  
    "return\_type": "double precision",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.gserialized\_gist\_sel\_nd(internal, oid, internal, integer)\\n RETURNS double precision\\n LANGUAGE c\\n PARALLEL SAFE\\nAS '$libdir/postgis-3', $function$gserialized\_gist\_sel\_nd$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "halfvec",  
    "arguments": "halfvec, integer, boolean",  
    "return\_type": "halfvec",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.halfvec(halfvec, integer, boolean)\\n RETURNS halfvec\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/vector', $function$halfvec$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "halfvec\_accum",  
    "arguments": "double precision\[\], halfvec",  
    "return\_type": "double precision\[\]",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.halfvec\_accum(double precision\[\], halfvec)\\n RETURNS double precision\[\]\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/vector', $function$halfvec\_accum$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "halfvec\_add",  
    "arguments": "halfvec, halfvec",  
    "return\_type": "halfvec",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.halfvec\_add(halfvec, halfvec)\\n RETURNS halfvec\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/vector', $function$halfvec\_add$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "halfvec\_avg",  
    "arguments": "double precision\[\]",  
    "return\_type": "halfvec",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.halfvec\_avg(double precision\[\])\\n RETURNS halfvec\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/vector', $function$halfvec\_avg$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "halfvec\_cmp",  
    "arguments": "halfvec, halfvec",  
    "return\_type": "integer",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.halfvec\_cmp(halfvec, halfvec)\\n RETURNS integer\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/vector', $function$halfvec\_cmp$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "halfvec\_combine",  
    "arguments": "double precision\[\], double precision\[\]",  
    "return\_type": "double precision\[\]",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.halfvec\_combine(double precision\[\], double precision\[\])\\n RETURNS double precision\[\]\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/vector', $function$vector\_combine$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "halfvec\_concat",  
    "arguments": "halfvec, halfvec",  
    "return\_type": "halfvec",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.halfvec\_concat(halfvec, halfvec)\\n RETURNS halfvec\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/vector', $function$halfvec\_concat$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "halfvec\_eq",  
    "arguments": "halfvec, halfvec",  
    "return\_type": "boolean",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.halfvec\_eq(halfvec, halfvec)\\n RETURNS boolean\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/vector', $function$halfvec\_eq$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "halfvec\_ge",  
    "arguments": "halfvec, halfvec",  
    "return\_type": "boolean",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.halfvec\_ge(halfvec, halfvec)\\n RETURNS boolean\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/vector', $function$halfvec\_ge$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "halfvec\_gt",  
    "arguments": "halfvec, halfvec",  
    "return\_type": "boolean",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.halfvec\_gt(halfvec, halfvec)\\n RETURNS boolean\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/vector', $function$halfvec\_gt$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "halfvec\_in",  
    "arguments": "cstring, oid, integer",  
    "return\_type": "halfvec",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.halfvec\_in(cstring, oid, integer)\\n RETURNS halfvec\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/vector', $function$halfvec\_in$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "halfvec\_l2\_squared\_distance",  
    "arguments": "halfvec, halfvec",  
    "return\_type": "double precision",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.halfvec\_l2\_squared\_distance(halfvec, halfvec)\\n RETURNS double precision\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/vector', $function$halfvec\_l2\_squared\_distance$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "halfvec\_le",  
    "arguments": "halfvec, halfvec",  
    "return\_type": "boolean",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.halfvec\_le(halfvec, halfvec)\\n RETURNS boolean\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/vector', $function$halfvec\_le$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "halfvec\_lt",  
    "arguments": "halfvec, halfvec",  
    "return\_type": "boolean",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.halfvec\_lt(halfvec, halfvec)\\n RETURNS boolean\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/vector', $function$halfvec\_lt$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "halfvec\_mul",  
    "arguments": "halfvec, halfvec",  
    "return\_type": "halfvec",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.halfvec\_mul(halfvec, halfvec)\\n RETURNS halfvec\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/vector', $function$halfvec\_mul$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "halfvec\_ne",  
    "arguments": "halfvec, halfvec",  
    "return\_type": "boolean",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.halfvec\_ne(halfvec, halfvec)\\n RETURNS boolean\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/vector', $function$halfvec\_ne$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "halfvec\_negative\_inner\_product",  
    "arguments": "halfvec, halfvec",  
    "return\_type": "double precision",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.halfvec\_negative\_inner\_product(halfvec, halfvec)\\n RETURNS double precision\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/vector', $function$halfvec\_negative\_inner\_product$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "halfvec\_out",  
    "arguments": "halfvec",  
    "return\_type": "cstring",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.halfvec\_out(halfvec)\\n RETURNS cstring\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/vector', $function$halfvec\_out$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "halfvec\_recv",  
    "arguments": "internal, oid, integer",  
    "return\_type": "halfvec",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.halfvec\_recv(internal, oid, integer)\\n RETURNS halfvec\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/vector', $function$halfvec\_recv$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "halfvec\_send",  
    "arguments": "halfvec",  
    "return\_type": "bytea",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.halfvec\_send(halfvec)\\n RETURNS bytea\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/vector', $function$halfvec\_send$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "halfvec\_spherical\_distance",  
    "arguments": "halfvec, halfvec",  
    "return\_type": "double precision",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.halfvec\_spherical\_distance(halfvec, halfvec)\\n RETURNS double precision\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/vector', $function$halfvec\_spherical\_distance$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "halfvec\_sub",  
    "arguments": "halfvec, halfvec",  
    "return\_type": "halfvec",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.halfvec\_sub(halfvec, halfvec)\\n RETURNS halfvec\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/vector', $function$halfvec\_sub$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "halfvec\_to\_float4",  
    "arguments": "halfvec, integer, boolean",  
    "return\_type": "real\[\]",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.halfvec\_to\_float4(halfvec, integer, boolean)\\n RETURNS real\[\]\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/vector', $function$halfvec\_to\_float4$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "halfvec\_to\_sparsevec",  
    "arguments": "halfvec, integer, boolean",  
    "return\_type": "sparsevec",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.halfvec\_to\_sparsevec(halfvec, integer, boolean)\\n RETURNS sparsevec\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/vector', $function$halfvec\_to\_sparsevec$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "halfvec\_to\_vector",  
    "arguments": "halfvec, integer, boolean",  
    "return\_type": "vector",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.halfvec\_to\_vector(halfvec, integer, boolean)\\n RETURNS vector\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/vector', $function$halfvec\_to\_vector$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "halfvec\_typmod\_in",  
    "arguments": "cstring\[\]",  
    "return\_type": "integer",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.halfvec\_typmod\_in(cstring\[\])\\n RETURNS integer\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/vector', $function$halfvec\_typmod\_in$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "hamming\_distance",  
    "arguments": "bit, bit",  
    "return\_type": "double precision",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.hamming\_distance(bit, bit)\\n RETURNS double precision\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/vector', $function$hamming\_distance$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "hnsw\_bit\_support",  
    "arguments": "internal",  
    "return\_type": "internal",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.hnsw\_bit\_support(internal)\\n RETURNS internal\\n LANGUAGE c\\nAS '$libdir/vector', $function$hnsw\_bit\_support$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "hnsw\_halfvec\_support",  
    "arguments": "internal",  
    "return\_type": "internal",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.hnsw\_halfvec\_support(internal)\\n RETURNS internal\\n LANGUAGE c\\nAS '$libdir/vector', $function$hnsw\_halfvec\_support$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "hnsw\_sparsevec\_support",  
    "arguments": "internal",  
    "return\_type": "internal",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.hnsw\_sparsevec\_support(internal)\\n RETURNS internal\\n LANGUAGE c\\nAS '$libdir/vector', $function$hnsw\_sparsevec\_support$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "hnswhandler",  
    "arguments": "internal",  
    "return\_type": "index\_am\_handler",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.hnswhandler(internal)\\n RETURNS index\_am\_handler\\n LANGUAGE c\\nAS '$libdir/vector', $function$hnswhandler$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "inner\_product",  
    "arguments": "halfvec, halfvec",  
    "return\_type": "double precision",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.inner\_product(halfvec, halfvec)\\n RETURNS double precision\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/vector', $function$halfvec\_inner\_product$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "inner\_product",  
    "arguments": "sparsevec, sparsevec",  
    "return\_type": "double precision",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.inner\_product(sparsevec, sparsevec)\\n RETURNS double precision\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/vector', $function$sparsevec\_inner\_product$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "inner\_product",  
    "arguments": "vector, vector",  
    "return\_type": "double precision",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.inner\_product(vector, vector)\\n RETURNS double precision\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/vector', $function$inner\_product$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "is\_contained\_2d",  
    "arguments": "box2df, geometry",  
    "return\_type": "boolean",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.is\_contained\_2d(box2df, geometry)\\n RETURNS boolean\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/postgis-3', $function$gserialized\_within\_box2df\_geom\_2d$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "is\_contained\_2d",  
    "arguments": "geometry, box2df",  
    "return\_type": "boolean",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.is\_contained\_2d(geometry, box2df)\\n RETURNS boolean\\n LANGUAGE sql\\n IMMUTABLE PARALLEL SAFE STRICT COST 1\\nAS $function$SELECT $2 OPERATOR(public.\~) $1;$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "is\_contained\_2d",  
    "arguments": "box2df, box2df",  
    "return\_type": "boolean",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.is\_contained\_2d(box2df, box2df)\\n RETURNS boolean\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/postgis-3', $function$gserialized\_contains\_box2df\_box2df\_2d$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "ivfflat\_bit\_support",  
    "arguments": "internal",  
    "return\_type": "internal",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.ivfflat\_bit\_support(internal)\\n RETURNS internal\\n LANGUAGE c\\nAS '$libdir/vector', $function$ivfflat\_bit\_support$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "ivfflat\_halfvec\_support",  
    "arguments": "internal",  
    "return\_type": "internal",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.ivfflat\_halfvec\_support(internal)\\n RETURNS internal\\n LANGUAGE c\\nAS '$libdir/vector', $function$ivfflat\_halfvec\_support$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "ivfflathandler",  
    "arguments": "internal",  
    "return\_type": "index\_am\_handler",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.ivfflathandler(internal)\\n RETURNS index\_am\_handler\\n LANGUAGE c\\nAS '$libdir/vector', $function$ivfflathandler$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "jaccard\_distance",  
    "arguments": "bit, bit",  
    "return\_type": "double precision",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.jaccard\_distance(bit, bit)\\n RETURNS double precision\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/vector', $function$jaccard\_distance$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "json",  
    "arguments": "geometry",  
    "return\_type": "json",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.\\"json\\"(geometry)\\n RETURNS json\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 500\\nAS '$libdir/postgis-3', $function$geometry\_to\_json$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "jsonb",  
    "arguments": "geometry",  
    "return\_type": "jsonb",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.jsonb(geometry)\\n RETURNS jsonb\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 500\\nAS '$libdir/postgis-3', $function$geometry\_to\_jsonb$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "l1\_distance",  
    "arguments": "halfvec, halfvec",  
    "return\_type": "double precision",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.l1\_distance(halfvec, halfvec)\\n RETURNS double precision\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/vector', $function$halfvec\_l1\_distance$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "l1\_distance",  
    "arguments": "sparsevec, sparsevec",  
    "return\_type": "double precision",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.l1\_distance(sparsevec, sparsevec)\\n RETURNS double precision\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/vector', $function$sparsevec\_l1\_distance$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "l1\_distance",  
    "arguments": "vector, vector",  
    "return\_type": "double precision",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.l1\_distance(vector, vector)\\n RETURNS double precision\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/vector', $function$l1\_distance$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "l2\_distance",  
    "arguments": "vector, vector",  
    "return\_type": "double precision",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.l2\_distance(vector, vector)\\n RETURNS double precision\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/vector', $function$l2\_distance$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "l2\_distance",  
    "arguments": "halfvec, halfvec",  
    "return\_type": "double precision",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.l2\_distance(halfvec, halfvec)\\n RETURNS double precision\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/vector', $function$halfvec\_l2\_distance$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "l2\_distance",  
    "arguments": "sparsevec, sparsevec",  
    "return\_type": "double precision",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.l2\_distance(sparsevec, sparsevec)\\n RETURNS double precision\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/vector', $function$sparsevec\_l2\_distance$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "l2\_norm",  
    "arguments": "sparsevec",  
    "return\_type": "double precision",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.l2\_norm(sparsevec)\\n RETURNS double precision\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/vector', $function$sparsevec\_l2\_norm$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "l2\_norm",  
    "arguments": "halfvec",  
    "return\_type": "double precision",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.l2\_norm(halfvec)\\n RETURNS double precision\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/vector', $function$halfvec\_l2\_norm$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "l2\_normalize",  
    "arguments": "sparsevec",  
    "return\_type": "sparsevec",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.l2\_normalize(sparsevec)\\n RETURNS sparsevec\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/vector', $function$sparsevec\_l2\_normalize$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "l2\_normalize",  
    "arguments": "vector",  
    "return\_type": "vector",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.l2\_normalize(vector)\\n RETURNS vector\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/vector', $function$l2\_normalize$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "l2\_normalize",  
    "arguments": "halfvec",  
    "return\_type": "halfvec",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.l2\_normalize(halfvec)\\n RETURNS halfvec\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/vector', $function$halfvec\_l2\_normalize$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "lockrow",  
    "arguments": "text, text, text, text, timestamp without time zone",  
    "return\_type": "integer",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.lockrow(text, text, text, text, timestamp without time zone)\\n RETURNS integer\\n LANGUAGE plpgsql\\n STRICT\\nAS $function$\\nDECLARE\\n\\tmyschema alias for $1;\\n\\tmytable alias for $2;\\n\\tmyrid   alias for $3;\\n\\tauthid alias for $4;\\n\\texpires alias for $5;\\n\\tret int;\\n\\tmytoid oid;\\n\\tmyrec RECORD;\\n\\nBEGIN\\n\\n\\tIF NOT LongTransactionsEnabled() THEN\\n\\t\\tRAISE EXCEPTION 'Long transaction support disabled, use EnableLongTransaction() to enable.';\\n\\tEND IF;\\n\\n\\tEXECUTE 'DELETE FROM authorization\_table WHERE expires \< now()';\\n\\n\\tSELECT c.oid INTO mytoid FROM pg\_class c, pg\_namespace n\\n\\t\\tWHERE c.relname \= mytable\\n\\t\\tAND c.relnamespace \= n.oid\\n\\t\\tAND n.nspname \= myschema;\\n\\n\\t-- RAISE NOTICE 'toid: %', mytoid;\\n\\n\\tFOR myrec IN SELECT \* FROM authorization\_table WHERE\\n\\t\\ttoid \= mytoid AND rid \= myrid\\n\\tLOOP\\n\\t\\tIF myrec.authid \!= authid THEN\\n\\t\\t\\tRETURN 0;\\n\\t\\tELSE\\n\\t\\t\\tRETURN 1;\\n\\t\\tEND IF;\\n\\tEND LOOP;\\n\\n\\tEXECUTE 'INSERT INTO authorization\_table VALUES ('||\\n\\t\\tquote\_literal(mytoid::text)||','||quote\_literal(myrid)||\\n\\t\\t','||quote\_literal(expires::text)||\\n\\t\\t','||quote\_literal(authid) ||')';\\n\\n\\tGET DIAGNOSTICS ret \= ROW\_COUNT;\\n\\n\\tRETURN ret;\\nEND;\\n$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "lockrow",  
    "arguments": "text, text, text, text",  
    "return\_type": "integer",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.lockrow(text, text, text, text)\\n RETURNS integer\\n LANGUAGE sql\\n STRICT\\nAS $function$ SELECT LockRow($1, $2, $3, $4, now()::timestamp+'1:00'); $function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "lockrow",  
    "arguments": "text, text, text",  
    "return\_type": "integer",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.lockrow(text, text, text)\\n RETURNS integer\\n LANGUAGE sql\\n STRICT\\nAS $function$ SELECT LockRow(current\_schema(), $1, $2, $3, now()::timestamp+'1:00'); $function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "lockrow",  
    "arguments": "text, text, text, timestamp without time zone",  
    "return\_type": "integer",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.lockrow(text, text, text, timestamp without time zone)\\n RETURNS integer\\n LANGUAGE sql\\n STRICT\\nAS $function$ SELECT LockRow(current\_schema(), $1, $2, $3, $4); $function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "longtransactionsenabled",  
    "arguments": "",  
    "return\_type": "boolean",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.longtransactionsenabled()\\n RETURNS boolean\\n LANGUAGE plpgsql\\nAS $function$\\nDECLARE\\n\\trec RECORD;\\nBEGIN\\n\\tFOR rec IN SELECT oid FROM pg\_class WHERE relname \= 'authorized\_tables'\\n\\tLOOP\\n\\t\\treturn 't';\\n\\tEND LOOP;\\n\\treturn 'f';\\nEND;\\n$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "match\_products\_v2",  
    "arguments": "query\_embedding vector, match\_threshold double precision DEFAULT 0.75, match\_count integer DEFAULT 5, filter\_category\_id integer DEFAULT NULL::integer",  
    "return\_type": "TABLE(id bigint, product\_name character varying, product\_description text, product\_category\_id integer, brand character varying, alternative\_names jsonb, search\_frequency integer, popularity\_score numeric, similarity double precision)",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.match\_products\_v2(query\_embedding vector, match\_threshold double precision DEFAULT 0.75, match\_count integer DEFAULT 5, filter\_category\_id integer DEFAULT NULL::integer)\\n RETURNS TABLE(id bigint, product\_name character varying, product\_description text, product\_category\_id integer, brand character varying, alternative\_names jsonb, search\_frequency integer, popularity\_score numeric, similarity double precision)\\n LANGUAGE plpgsql\\nAS $function$\\nBEGIN\\n  RETURN QUERY\\n  SELECT\\n    ml.id,\\n    ml.product\_name,\\n    ml.product\_description,\\n    ml.product\_category\_id,\\n    ml.brand,\\n    ml.alternative\_names,\\n    ml.search\_frequency,\\n    ml.popularity\_score,\\n    1 \- (ml.embedding\_vector\_v2 \<=\> query\_embedding) AS similarity\\n  FROM master\_list ml\\n  WHERE \\n    ml.is\_active \= true\\n    AND ml.embedding\_vector\_v2 IS NOT NULL\\n    AND 1 \- (ml.embedding\_vector\_v2 \<=\> query\_embedding) \> match\_threshold\\n    AND (filter\_category\_id IS NULL OR ml.product\_category\_id \= filter\_category\_id)\\n  ORDER BY ml.embedding\_vector\_v2 \<=\> query\_embedding\\n  LIMIT match\_count;\\nEND;\\n$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "overlaps\_2d",  
    "arguments": "box2df, box2df",  
    "return\_type": "boolean",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.overlaps\_2d(box2df, box2df)\\n RETURNS boolean\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/postgis-3', $function$gserialized\_contains\_box2df\_box2df\_2d$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "overlaps\_2d",  
    "arguments": "geometry, box2df",  
    "return\_type": "boolean",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.overlaps\_2d(geometry, box2df)\\n RETURNS boolean\\n LANGUAGE sql\\n IMMUTABLE PARALLEL SAFE STRICT COST 1\\nAS $function$SELECT $2 OPERATOR(public.&&) $1;$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "overlaps\_2d",  
    "arguments": "box2df, geometry",  
    "return\_type": "boolean",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.overlaps\_2d(box2df, geometry)\\n RETURNS boolean\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/postgis-3', $function$gserialized\_overlaps\_box2df\_geom\_2d$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "overlaps\_geog",  
    "arguments": "geography, gidx",  
    "return\_type": "boolean",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.overlaps\_geog(geography, gidx)\\n RETURNS boolean\\n LANGUAGE sql\\n IMMUTABLE STRICT\\nAS $function$SELECT $2 OPERATOR(public.&&) $1;$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "overlaps\_geog",  
    "arguments": "gidx, gidx",  
    "return\_type": "boolean",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.overlaps\_geog(gidx, gidx)\\n RETURNS boolean\\n LANGUAGE c\\n IMMUTABLE STRICT\\nAS '$libdir/postgis-3', $function$gserialized\_gidx\_gidx\_overlaps$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "overlaps\_geog",  
    "arguments": "gidx, geography",  
    "return\_type": "boolean",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.overlaps\_geog(gidx, geography)\\n RETURNS boolean\\n LANGUAGE c\\n IMMUTABLE STRICT\\nAS '$libdir/postgis-3', $function$gserialized\_gidx\_geog\_overlaps$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "overlaps\_nd",  
    "arguments": "geometry, gidx",  
    "return\_type": "boolean",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.overlaps\_nd(geometry, gidx)\\n RETURNS boolean\\n LANGUAGE sql\\n IMMUTABLE PARALLEL SAFE STRICT COST 1\\nAS $function$SELECT $2 OPERATOR(public.&&&) $1;$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "overlaps\_nd",  
    "arguments": "gidx, geometry",  
    "return\_type": "boolean",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.overlaps\_nd(gidx, geometry)\\n RETURNS boolean\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/postgis-3', $function$gserialized\_gidx\_geom\_overlaps$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "overlaps\_nd",  
    "arguments": "gidx, gidx",  
    "return\_type": "boolean",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.overlaps\_nd(gidx, gidx)\\n RETURNS boolean\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/postgis-3', $function$gserialized\_gidx\_gidx\_overlaps$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "path",  
    "arguments": "geometry",  
    "return\_type": "path",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.path(geometry)\\n RETURNS path\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/postgis-3', $function$geometry\_to\_path$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "pgis\_asflatgeobuf\_finalfn",  
    "arguments": "internal",  
    "return\_type": "bytea",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.pgis\_asflatgeobuf\_finalfn(internal)\\n RETURNS bytea\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE COST 500\\nAS '$libdir/postgis-3', $function$pgis\_asflatgeobuf\_finalfn$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "pgis\_asflatgeobuf\_transfn",  
    "arguments": "internal, anyelement",  
    "return\_type": "internal",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.pgis\_asflatgeobuf\_transfn(internal, anyelement)\\n RETURNS internal\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE COST 50\\nAS '$libdir/postgis-3', $function$pgis\_asflatgeobuf\_transfn$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "pgis\_asflatgeobuf\_transfn",  
    "arguments": "internal, anyelement, boolean, text",  
    "return\_type": "internal",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.pgis\_asflatgeobuf\_transfn(internal, anyelement, boolean, text)\\n RETURNS internal\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE COST 50\\nAS '$libdir/postgis-3', $function$pgis\_asflatgeobuf\_transfn$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "pgis\_asflatgeobuf\_transfn",  
    "arguments": "internal, anyelement, boolean",  
    "return\_type": "internal",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.pgis\_asflatgeobuf\_transfn(internal, anyelement, boolean)\\n RETURNS internal\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE COST 50\\nAS '$libdir/postgis-3', $function$pgis\_asflatgeobuf\_transfn$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "pgis\_asgeobuf\_finalfn",  
    "arguments": "internal",  
    "return\_type": "bytea",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.pgis\_asgeobuf\_finalfn(internal)\\n RETURNS bytea\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE COST 500\\nAS '$libdir/postgis-3', $function$pgis\_asgeobuf\_finalfn$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "pgis\_asgeobuf\_transfn",  
    "arguments": "internal, anyelement",  
    "return\_type": "internal",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.pgis\_asgeobuf\_transfn(internal, anyelement)\\n RETURNS internal\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE COST 50\\nAS '$libdir/postgis-3', $function$pgis\_asgeobuf\_transfn$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "pgis\_asgeobuf\_transfn",  
    "arguments": "internal, anyelement, text",  
    "return\_type": "internal",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.pgis\_asgeobuf\_transfn(internal, anyelement, text)\\n RETURNS internal\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE COST 50\\nAS '$libdir/postgis-3', $function$pgis\_asgeobuf\_transfn$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "pgis\_asmvt\_combinefn",  
    "arguments": "internal, internal",  
    "return\_type": "internal",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.pgis\_asmvt\_combinefn(internal, internal)\\n RETURNS internal\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE COST 500\\nAS '$libdir/postgis-3', $function$pgis\_asmvt\_combinefn$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "pgis\_asmvt\_deserialfn",  
    "arguments": "bytea, internal",  
    "return\_type": "internal",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.pgis\_asmvt\_deserialfn(bytea, internal)\\n RETURNS internal\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE COST 500\\nAS '$libdir/postgis-3', $function$pgis\_asmvt\_deserialfn$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "pgis\_asmvt\_finalfn",  
    "arguments": "internal",  
    "return\_type": "bytea",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.pgis\_asmvt\_finalfn(internal)\\n RETURNS bytea\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE COST 500\\nAS '$libdir/postgis-3', $function$pgis\_asmvt\_finalfn$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "pgis\_asmvt\_serialfn",  
    "arguments": "internal",  
    "return\_type": "bytea",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.pgis\_asmvt\_serialfn(internal)\\n RETURNS bytea\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE COST 500\\nAS '$libdir/postgis-3', $function$pgis\_asmvt\_serialfn$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "pgis\_asmvt\_transfn",  
    "arguments": "internal, anyelement, text",  
    "return\_type": "internal",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.pgis\_asmvt\_transfn(internal, anyelement, text)\\n RETURNS internal\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE COST 500\\nAS '$libdir/postgis-3', $function$pgis\_asmvt\_transfn$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "pgis\_asmvt\_transfn",  
    "arguments": "internal, anyelement, text, integer, text",  
    "return\_type": "internal",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.pgis\_asmvt\_transfn(internal, anyelement, text, integer, text)\\n RETURNS internal\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE COST 500\\nAS '$libdir/postgis-3', $function$pgis\_asmvt\_transfn$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "pgis\_asmvt\_transfn",  
    "arguments": "internal, anyelement",  
    "return\_type": "internal",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.pgis\_asmvt\_transfn(internal, anyelement)\\n RETURNS internal\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE COST 500\\nAS '$libdir/postgis-3', $function$pgis\_asmvt\_transfn$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "pgis\_asmvt\_transfn",  
    "arguments": "internal, anyelement, text, integer",  
    "return\_type": "internal",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.pgis\_asmvt\_transfn(internal, anyelement, text, integer)\\n RETURNS internal\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE COST 500\\nAS '$libdir/postgis-3', $function$pgis\_asmvt\_transfn$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "pgis\_asmvt\_transfn",  
    "arguments": "internal, anyelement, text, integer, text, text",  
    "return\_type": "internal",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.pgis\_asmvt\_transfn(internal, anyelement, text, integer, text, text)\\n RETURNS internal\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE COST 500\\nAS '$libdir/postgis-3', $function$pgis\_asmvt\_transfn$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "pgis\_geometry\_accum\_transfn",  
    "arguments": "internal, geometry",  
    "return\_type": "internal",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.pgis\_geometry\_accum\_transfn(internal, geometry)\\n RETURNS internal\\n LANGUAGE c\\n PARALLEL SAFE COST 50\\nAS '$libdir/postgis-3', $function$pgis\_geometry\_accum\_transfn$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "pgis\_geometry\_accum\_transfn",  
    "arguments": "internal, geometry, double precision",  
    "return\_type": "internal",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.pgis\_geometry\_accum\_transfn(internal, geometry, double precision)\\n RETURNS internal\\n LANGUAGE c\\n PARALLEL SAFE COST 50\\nAS '$libdir/postgis-3', $function$pgis\_geometry\_accum\_transfn$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "pgis\_geometry\_accum\_transfn",  
    "arguments": "internal, geometry, double precision, integer",  
    "return\_type": "internal",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.pgis\_geometry\_accum\_transfn(internal, geometry, double precision, integer)\\n RETURNS internal\\n LANGUAGE c\\n PARALLEL SAFE COST 50\\nAS '$libdir/postgis-3', $function$pgis\_geometry\_accum\_transfn$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "pgis\_geometry\_clusterintersecting\_finalfn",  
    "arguments": "internal",  
    "return\_type": "geometry\[\]",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.pgis\_geometry\_clusterintersecting\_finalfn(internal)\\n RETURNS geometry\[\]\\n LANGUAGE c\\n PARALLEL SAFE COST 500\\nAS '$libdir/postgis-3', $function$pgis\_geometry\_clusterintersecting\_finalfn$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "pgis\_geometry\_clusterwithin\_finalfn",  
    "arguments": "internal",  
    "return\_type": "geometry\[\]",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.pgis\_geometry\_clusterwithin\_finalfn(internal)\\n RETURNS geometry\[\]\\n LANGUAGE c\\n PARALLEL SAFE COST 500\\nAS '$libdir/postgis-3', $function$pgis\_geometry\_clusterwithin\_finalfn$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "pgis\_geometry\_collect\_finalfn",  
    "arguments": "internal",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.pgis\_geometry\_collect\_finalfn(internal)\\n RETURNS geometry\\n LANGUAGE c\\n PARALLEL SAFE COST 500\\nAS '$libdir/postgis-3', $function$pgis\_geometry\_collect\_finalfn$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "pgis\_geometry\_makeline\_finalfn",  
    "arguments": "internal",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.pgis\_geometry\_makeline\_finalfn(internal)\\n RETURNS geometry\\n LANGUAGE c\\n PARALLEL SAFE COST 500\\nAS '$libdir/postgis-3', $function$pgis\_geometry\_makeline\_finalfn$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "pgis\_geometry\_polygonize\_finalfn",  
    "arguments": "internal",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.pgis\_geometry\_polygonize\_finalfn(internal)\\n RETURNS geometry\\n LANGUAGE c\\n PARALLEL SAFE COST 500\\nAS '$libdir/postgis-3', $function$pgis\_geometry\_polygonize\_finalfn$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "pgis\_geometry\_union\_parallel\_combinefn",  
    "arguments": "internal, internal",  
    "return\_type": "internal",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.pgis\_geometry\_union\_parallel\_combinefn(internal, internal)\\n RETURNS internal\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE\\nAS '$libdir/postgis-3', $function$pgis\_geometry\_union\_parallel\_combinefn$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "pgis\_geometry\_union\_parallel\_deserialfn",  
    "arguments": "bytea, internal",  
    "return\_type": "internal",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.pgis\_geometry\_union\_parallel\_deserialfn(bytea, internal)\\n RETURNS internal\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/postgis-3', $function$pgis\_geometry\_union\_parallel\_deserialfn$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "pgis\_geometry\_union\_parallel\_finalfn",  
    "arguments": "internal",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.pgis\_geometry\_union\_parallel\_finalfn(internal)\\n RETURNS geometry\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 10000\\nAS '$libdir/postgis-3', $function$pgis\_geometry\_union\_parallel\_finalfn$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "pgis\_geometry\_union\_parallel\_serialfn",  
    "arguments": "internal",  
    "return\_type": "bytea",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.pgis\_geometry\_union\_parallel\_serialfn(internal)\\n RETURNS bytea\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/postgis-3', $function$pgis\_geometry\_union\_parallel\_serialfn$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "pgis\_geometry\_union\_parallel\_transfn",  
    "arguments": "internal, geometry",  
    "return\_type": "internal",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.pgis\_geometry\_union\_parallel\_transfn(internal, geometry)\\n RETURNS internal\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE\\nAS '$libdir/postgis-3', $function$pgis\_geometry\_union\_parallel\_transfn$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "pgis\_geometry\_union\_parallel\_transfn",  
    "arguments": "internal, geometry, double precision",  
    "return\_type": "internal",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.pgis\_geometry\_union\_parallel\_transfn(internal, geometry, double precision)\\n RETURNS internal\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE COST 50\\nAS '$libdir/postgis-3', $function$pgis\_geometry\_union\_parallel\_transfn$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "point",  
    "arguments": "geometry",  
    "return\_type": "point",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.point(geometry)\\n RETURNS point\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/postgis-3', $function$geometry\_to\_point$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "polygon",  
    "arguments": "geometry",  
    "return\_type": "polygon",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.polygon(geometry)\\n RETURNS polygon\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/postgis-3', $function$geometry\_to\_polygon$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "populate\_geometry\_columns",  
    "arguments": "tbl\_oid oid, use\_typmod boolean DEFAULT true",  
    "return\_type": "integer",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.populate\_geometry\_columns(tbl\_oid oid, use\_typmod boolean DEFAULT true)\\n RETURNS integer\\n LANGUAGE plpgsql\\nAS $function$\\nDECLARE\\n\\tgcs\\t\\t RECORD;\\n\\tgc\\t\\t  RECORD;\\n\\tgc\_old\\t  RECORD;\\n\\tgsrid\\t   integer;\\n\\tgndims\\t  integer;\\n\\tgtype\\t   text;\\n\\tquery\\t   text;\\n\\tgc\_is\_valid boolean;\\n\\tinserted\\tinteger;\\n\\tconstraint\_successful boolean := false;\\n\\nBEGIN\\n\\tinserted := 0;\\n\\n\\t-- Iterate through all geometry columns in this table\\n\\tFOR gcs IN\\n\\tSELECT n.nspname, c.relname, a.attname, c.relkind\\n\\t\\tFROM pg\_class c,\\n\\t\\t\\t pg\_attribute a,\\n\\t\\t\\t pg\_type t,\\n\\t\\t\\t pg\_namespace n\\n\\t\\tWHERE c.relkind IN('r', 'f', 'p')\\n\\t\\tAND t.typname \= 'geometry'\\n\\t\\tAND a.attisdropped \= false\\n\\t\\tAND a.atttypid \= t.oid\\n\\t\\tAND a.attrelid \= c.oid\\n\\t\\tAND c.relnamespace \= n.oid\\n\\t\\tAND n.nspname NOT ILIKE 'pg\_temp%'\\n\\t\\tAND c.oid \= tbl\_oid\\n\\tLOOP\\n\\n\\t\\tRAISE DEBUG 'Processing column %.%.%', gcs.nspname, gcs.relname, gcs.attname;\\n\\n\\t\\tgc\_is\_valid := true;\\n\\t\\t-- Find the srid, coord\_dimension, and type of current geometry\\n\\t\\t-- in geometry\_columns \-- which is now a view\\n\\n\\t\\tSELECT type, srid, coord\_dimension, gcs.relkind INTO gc\_old\\n\\t\\t\\tFROM geometry\_columns\\n\\t\\t\\tWHERE f\_table\_schema \= gcs.nspname AND f\_table\_name \= gcs.relname AND f\_geometry\_column \= gcs.attname;\\n\\n\\t\\tIF upper(gc\_old.type) \= 'GEOMETRY' THEN\\n\\t\\t-- This is an unconstrained geometry we need to do something\\n\\t\\t-- We need to figure out what to set the type by inspecting the data\\n\\t\\t\\tEXECUTE 'SELECT public.ST\_srid(' || quote\_ident(gcs.attname) || ') As srid, public.GeometryType(' || quote\_ident(gcs.attname) || ') As type, public.ST\_NDims(' || quote\_ident(gcs.attname) || ') As dims ' ||\\n\\t\\t\\t\\t\\t ' FROM ONLY ' || quote\_ident(gcs.nspname) || '.' || quote\_ident(gcs.relname) ||\\n\\t\\t\\t\\t\\t ' WHERE ' || quote\_ident(gcs.attname) || ' IS NOT NULL LIMIT 1;'\\n\\t\\t\\t\\tINTO gc;\\n\\t\\t\\tIF gc IS NULL THEN \-- there is no data so we can not determine geometry type\\n\\t\\t\\t\\tRAISE WARNING 'No data in table %.%, so no information to determine geometry type and srid', gcs.nspname, gcs.relname;\\n\\t\\t\\t\\tRETURN 0;\\n\\t\\t\\tEND IF;\\n\\t\\t\\tgsrid := gc.srid; gtype := gc.type; gndims := gc.dims;\\n\\n\\t\\t\\tIF use\_typmod THEN\\n\\t\\t\\t\\tBEGIN\\n\\t\\t\\t\\t\\tEXECUTE 'ALTER TABLE ' || quote\_ident(gcs.nspname) || '.' || quote\_ident(gcs.relname) || ' ALTER COLUMN ' || quote\_ident(gcs.attname) ||\\n\\t\\t\\t\\t\\t\\t' TYPE geometry(' || postgis\_type\_name(gtype, gndims, true) || ', ' || gsrid::text  || ') ';\\n\\t\\t\\t\\t\\tinserted := inserted \+ 1;\\n\\t\\t\\t\\tEXCEPTION\\n\\t\\t\\t\\t\\t\\tWHEN invalid\_parameter\_value OR feature\_not\_supported THEN\\n\\t\\t\\t\\t\\t\\tRAISE WARNING 'Could not convert ''%'' in ''%.%'' to use typmod with srid %, type %: %', quote\_ident(gcs.attname), quote\_ident(gcs.nspname), quote\_ident(gcs.relname), gsrid, postgis\_type\_name(gtype, gndims, true), SQLERRM;\\n\\t\\t\\t\\t\\t\\t\\tgc\_is\_valid := false;\\n\\t\\t\\t\\tEND;\\n\\n\\t\\t\\tELSE\\n\\t\\t\\t\\t-- Try to apply srid check to column\\n\\t\\t\\t\\tconstraint\_successful \= false;\\n\\t\\t\\t\\tIF (gsrid \> 0 AND postgis\_constraint\_srid(gcs.nspname, gcs.relname,gcs.attname) IS NULL ) THEN\\n\\t\\t\\t\\t\\tBEGIN\\n\\t\\t\\t\\t\\t\\tEXECUTE 'ALTER TABLE ONLY ' || quote\_ident(gcs.nspname) || '.' || quote\_ident(gcs.relname) ||\\n\\t\\t\\t\\t\\t\\t\\t\\t ' ADD CONSTRAINT ' || quote\_ident('enforce\_srid\_' || gcs.attname) ||\\n\\t\\t\\t\\t\\t\\t\\t\\t ' CHECK (ST\_srid(' || quote\_ident(gcs.attname) || ') \= ' || gsrid || ')';\\n\\t\\t\\t\\t\\t\\tconstraint\_successful := true;\\n\\t\\t\\t\\t\\tEXCEPTION\\n\\t\\t\\t\\t\\t\\tWHEN check\_violation THEN\\n\\t\\t\\t\\t\\t\\t\\tRAISE WARNING 'Not inserting ''%'' in ''%.%'' into geometry\_columns: could not apply constraint CHECK (st\_srid(%) \= %)', quote\_ident(gcs.attname), quote\_ident(gcs.nspname), quote\_ident(gcs.relname), quote\_ident(gcs.attname), gsrid;\\n\\t\\t\\t\\t\\t\\t\\tgc\_is\_valid := false;\\n\\t\\t\\t\\t\\tEND;\\n\\t\\t\\t\\tEND IF;\\n\\n\\t\\t\\t\\t-- Try to apply ndims check to column\\n\\t\\t\\t\\tIF (gndims IS NOT NULL AND postgis\_constraint\_dims(gcs.nspname, gcs.relname,gcs.attname) IS NULL ) THEN\\n\\t\\t\\t\\t\\tBEGIN\\n\\t\\t\\t\\t\\t\\tEXECUTE 'ALTER TABLE ONLY ' || quote\_ident(gcs.nspname) || '.' || quote\_ident(gcs.relname) || '\\n\\t\\t\\t\\t\\t\\t\\t\\t ADD CONSTRAINT ' || quote\_ident('enforce\_dims\_' || gcs.attname) || '\\n\\t\\t\\t\\t\\t\\t\\t\\t CHECK (st\_ndims(' || quote\_ident(gcs.attname) || ') \= '||gndims||')';\\n\\t\\t\\t\\t\\t\\tconstraint\_successful := true;\\n\\t\\t\\t\\t\\tEXCEPTION\\n\\t\\t\\t\\t\\t\\tWHEN check\_violation THEN\\n\\t\\t\\t\\t\\t\\t\\tRAISE WARNING 'Not inserting ''%'' in ''%.%'' into geometry\_columns: could not apply constraint CHECK (st\_ndims(%) \= %)', quote\_ident(gcs.attname), quote\_ident(gcs.nspname), quote\_ident(gcs.relname), quote\_ident(gcs.attname), gndims;\\n\\t\\t\\t\\t\\t\\t\\tgc\_is\_valid := false;\\n\\t\\t\\t\\t\\tEND;\\n\\t\\t\\t\\tEND IF;\\n\\n\\t\\t\\t\\t-- Try to apply geometrytype check to column\\n\\t\\t\\t\\tIF (gtype IS NOT NULL AND postgis\_constraint\_type(gcs.nspname, gcs.relname,gcs.attname) IS NULL ) THEN\\n\\t\\t\\t\\t\\tBEGIN\\n\\t\\t\\t\\t\\t\\tEXECUTE 'ALTER TABLE ONLY ' || quote\_ident(gcs.nspname) || '.' || quote\_ident(gcs.relname) || '\\n\\t\\t\\t\\t\\t\\tADD CONSTRAINT ' || quote\_ident('enforce\_geotype\_' || gcs.attname) || '\\n\\t\\t\\t\\t\\t\\tCHECK (geometrytype(' || quote\_ident(gcs.attname) || ') \= ' || quote\_literal(gtype) || ')';\\n\\t\\t\\t\\t\\t\\tconstraint\_successful := true;\\n\\t\\t\\t\\t\\tEXCEPTION\\n\\t\\t\\t\\t\\t\\tWHEN check\_violation THEN\\n\\t\\t\\t\\t\\t\\t\\t-- No geometry check can be applied. This column contains a number of geometry types.\\n\\t\\t\\t\\t\\t\\t\\tRAISE WARNING 'Could not add geometry type check (%) to table column: %.%.%', gtype, quote\_ident(gcs.nspname),quote\_ident(gcs.relname),quote\_ident(gcs.attname);\\n\\t\\t\\t\\t\\tEND;\\n\\t\\t\\t\\tEND IF;\\n\\t\\t\\t\\t \--only count if we were successful in applying at least one constraint\\n\\t\\t\\t\\tIF constraint\_successful THEN\\n\\t\\t\\t\\t\\tinserted := inserted \+ 1;\\n\\t\\t\\t\\tEND IF;\\n\\t\\t\\tEND IF;\\n\\t\\tEND IF;\\n\\n\\tEND LOOP;\\n\\n\\tRETURN inserted;\\nEND\\n\\n$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "populate\_geometry\_columns",  
    "arguments": "use\_typmod boolean DEFAULT true",  
    "return\_type": "text",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.populate\_geometry\_columns(use\_typmod boolean DEFAULT true)\\n RETURNS text\\n LANGUAGE plpgsql\\nAS $function$\\nDECLARE\\n\\tinserted\\tinteger;\\n\\toldcount\\tinteger;\\n\\tprobed\\t  integer;\\n\\tstale\\t   integer;\\n\\tgcs\\t\\t RECORD;\\n\\tgc\\t\\t  RECORD;\\n\\tgsrid\\t   integer;\\n\\tgndims\\t  integer;\\n\\tgtype\\t   text;\\n\\tquery\\t   text;\\n\\tgc\_is\_valid boolean;\\n\\nBEGIN\\n\\tSELECT count(\*) INTO oldcount FROM public.geometry\_columns;\\n\\tinserted := 0;\\n\\n\\t-- Count the number of geometry columns in all tables and views\\n\\tSELECT count(DISTINCT c.oid) INTO probed\\n\\tFROM pg\_class c,\\n\\t\\t pg\_attribute a,\\n\\t\\t pg\_type t,\\n\\t\\t pg\_namespace n\\n\\tWHERE c.relkind IN('r','v','f', 'p')\\n\\t\\tAND t.typname \= 'geometry'\\n\\t\\tAND a.attisdropped \= false\\n\\t\\tAND a.atttypid \= t.oid\\n\\t\\tAND a.attrelid \= c.oid\\n\\t\\tAND c.relnamespace \= n.oid\\n\\t\\tAND n.nspname NOT ILIKE 'pg\_temp%' AND c.relname \!= 'raster\_columns' ;\\n\\n\\t-- Iterate through all non-dropped geometry columns\\n\\tRAISE DEBUG 'Processing Tables.....';\\n\\n\\tFOR gcs IN\\n\\tSELECT DISTINCT ON (c.oid) c.oid, n.nspname, c.relname\\n\\t\\tFROM pg\_class c,\\n\\t\\t\\t pg\_attribute a,\\n\\t\\t\\t pg\_type t,\\n\\t\\t\\t pg\_namespace n\\n\\t\\tWHERE c.relkind IN( 'r', 'f', 'p')\\n\\t\\tAND t.typname \= 'geometry'\\n\\t\\tAND a.attisdropped \= false\\n\\t\\tAND a.atttypid \= t.oid\\n\\t\\tAND a.attrelid \= c.oid\\n\\t\\tAND c.relnamespace \= n.oid\\n\\t\\tAND n.nspname NOT ILIKE 'pg\_temp%' AND c.relname \!= 'raster\_columns'\\n\\tLOOP\\n\\n\\t\\tinserted := inserted \+ public.populate\_geometry\_columns(gcs.oid, use\_typmod);\\n\\tEND LOOP;\\n\\n\\tIF oldcount \> inserted THEN\\n\\t\\tstale \= oldcount-inserted;\\n\\tELSE\\n\\t\\tstale \= 0;\\n\\tEND IF;\\n\\n\\tRETURN 'probed:' ||probed|| ' inserted:'||inserted;\\nEND\\n\\n$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "postgis\_addbbox",  
    "arguments": "geometry",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.postgis\_addbbox(geometry)\\n RETURNS geometry\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 50\\nAS '$libdir/postgis-3', $function$LWGEOM\_addBBOX$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "postgis\_cache\_bbox",  
    "arguments": "",  
    "return\_type": "trigger",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.postgis\_cache\_bbox()\\n RETURNS trigger\\n LANGUAGE c\\nAS '$libdir/postgis-3', $function$cache\_bbox$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "postgis\_constraint\_dims",  
    "arguments": "geomschema text, geomtable text, geomcolumn text",  
    "return\_type": "integer",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.postgis\_constraint\_dims(geomschema text, geomtable text, geomcolumn text)\\n RETURNS integer\\n LANGUAGE sql\\n STABLE PARALLEL SAFE STRICT COST 500\\nAS $function$\\nSELECT  replace(split\_part(s.consrc, ' \= ', 2), ')', '')::integer\\n\\t\\t FROM pg\_class c, pg\_namespace n, pg\_attribute a\\n\\t\\t , (SELECT connamespace, conrelid, conkey, pg\_get\_constraintdef(oid) As consrc\\n\\t\\t\\tFROM pg\_constraint) AS s\\n\\t\\t WHERE n.nspname \= $1\\n\\t\\t AND c.relname \= $2\\n\\t\\t AND a.attname \= $3\\n\\t\\t AND a.attrelid \= c.oid\\n\\t\\t AND s.connamespace \= n.oid\\n\\t\\t AND s.conrelid \= c.oid\\n\\t\\t AND a.attnum \= ANY (s.conkey)\\n\\t\\t AND s.consrc LIKE '%ndims(% \= %';\\n$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "postgis\_constraint\_srid",  
    "arguments": "geomschema text, geomtable text, geomcolumn text",  
    "return\_type": "integer",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.postgis\_constraint\_srid(geomschema text, geomtable text, geomcolumn text)\\n RETURNS integer\\n LANGUAGE sql\\n STABLE PARALLEL SAFE STRICT COST 500\\nAS $function$\\nSELECT replace(replace(split\_part(s.consrc, ' \= ', 2), ')', ''), '(', '')::integer\\n\\t\\t FROM pg\_class c, pg\_namespace n, pg\_attribute a\\n\\t\\t , (SELECT connamespace, conrelid, conkey, pg\_get\_constraintdef(oid) As consrc\\n\\t\\t\\tFROM pg\_constraint) AS s\\n\\t\\t WHERE n.nspname \= $1\\n\\t\\t AND c.relname \= $2\\n\\t\\t AND a.attname \= $3\\n\\t\\t AND a.attrelid \= c.oid\\n\\t\\t AND s.connamespace \= n.oid\\n\\t\\t AND s.conrelid \= c.oid\\n\\t\\t AND a.attnum \= ANY (s.conkey)\\n\\t\\t AND s.consrc LIKE '%srid(% \= %';\\n$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "postgis\_constraint\_type",  
    "arguments": "geomschema text, geomtable text, geomcolumn text",  
    "return\_type": "character varying",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.postgis\_constraint\_type(geomschema text, geomtable text, geomcolumn text)\\n RETURNS character varying\\n LANGUAGE sql\\n STABLE PARALLEL SAFE STRICT COST 500\\nAS $function$\\nSELECT  replace(split\_part(s.consrc, '''', 2), ')', '')::varchar\\n\\t\\t FROM pg\_class c, pg\_namespace n, pg\_attribute a\\n\\t\\t , (SELECT connamespace, conrelid, conkey, pg\_get\_constraintdef(oid) As consrc\\n\\t\\t\\tFROM pg\_constraint) AS s\\n\\t\\t WHERE n.nspname \= $1\\n\\t\\t AND c.relname \= $2\\n\\t\\t AND a.attname \= $3\\n\\t\\t AND a.attrelid \= c.oid\\n\\t\\t AND s.connamespace \= n.oid\\n\\t\\t AND s.conrelid \= c.oid\\n\\t\\t AND a.attnum \= ANY (s.conkey)\\n\\t\\t AND s.consrc LIKE '%geometrytype(% \= %';\\n$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "postgis\_dropbbox",  
    "arguments": "geometry",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.postgis\_dropbbox(geometry)\\n RETURNS geometry\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 50\\nAS '$libdir/postgis-3', $function$LWGEOM\_dropBBOX$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "postgis\_extensions\_upgrade",  
    "arguments": "",  
    "return\_type": "text",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.postgis\_extensions\_upgrade()\\n RETURNS text\\n LANGUAGE plpgsql\\nAS $function$\\nDECLARE\\n\\trec record;\\n\\tsql text;\\n\\tvar\_schema text;\\n\\ttarget\_version text; \-- TODO: optionally take as argument\\nBEGIN\\n\\n\\tFOR rec IN\\n\\t\\tSELECT name, default\_version, installed\_version\\n\\t\\tFROM pg\_catalog.pg\_available\_extensions\\n\\t\\tWHERE name IN (\\n\\t\\t\\t'postgis',\\n\\t\\t\\t'postgis\_raster',\\n\\t\\t\\t'postgis\_sfcgal',\\n\\t\\t\\t'postgis\_topology',\\n\\t\\t\\t'postgis\_tiger\_geocoder'\\n\\t\\t)\\n\\t\\tORDER BY length(name) \-- this is to make sure 'postgis' is first \!\\n\\tLOOP \--{\\n\\n\\t\\tIF target\_version IS NULL THEN\\n\\t\\t\\ttarget\_version := rec.default\_version;\\n\\t\\tEND IF;\\n\\n\\t\\tIF rec.installed\_version IS NULL THEN \--{\\n\\t\\t\\t-- If the support installed by available extension\\n\\t\\t\\t-- is found unpackaged, we package it\\n\\t\\t\\tIF \--{\\n\\t\\t\\t\\t \-- PostGIS is always available (this function is part of it)\\n\\t\\t\\t\\t rec.name \= 'postgis'\\n\\n\\t\\t\\t\\t \-- PostGIS raster is available if type 'raster' exists\\n\\t\\t\\t\\t OR ( rec.name \= 'postgis\_raster' AND EXISTS (\\n\\t\\t\\t\\t\\t\\t\\tSELECT 1 FROM pg\_catalog.pg\_type\\n\\t\\t\\t\\t\\t\\t\\tWHERE typname \= 'raster' ) )\\n\\n\\t\\t\\t\\t \-- PostGIS SFCGAL is availble if\\n\\t\\t\\t\\t \-- 'postgis\_sfcgal\_version' function exists\\n\\t\\t\\t\\t OR ( rec.name \= 'postgis\_sfcgal' AND EXISTS (\\n\\t\\t\\t\\t\\t\\t\\tSELECT 1 FROM pg\_catalog.pg\_proc\\n\\t\\t\\t\\t\\t\\t\\tWHERE proname \= 'postgis\_sfcgal\_version' ) )\\n\\n\\t\\t\\t\\t \-- PostGIS Topology is available if\\n\\t\\t\\t\\t \-- 'topology.topology' table exists\\n\\t\\t\\t\\t \-- NOTE: watch out for https://trac.osgeo.org/postgis/ticket/2503\\n\\t\\t\\t\\t OR ( rec.name \= 'postgis\_topology' AND EXISTS (\\n\\t\\t\\t\\t\\t\\t\\tSELECT 1 FROM pg\_catalog.pg\_class c\\n\\t\\t\\t\\t\\t\\t\\tJOIN pg\_catalog.pg\_namespace n ON (c.relnamespace \= n.oid )\\n\\t\\t\\t\\t\\t\\t\\tWHERE n.nspname \= 'topology' AND c.relname \= 'topology') )\\n\\n\\t\\t\\t\\t OR ( rec.name \= 'postgis\_tiger\_geocoder' AND EXISTS (\\n\\t\\t\\t\\t\\t\\t\\tSELECT 1 FROM pg\_catalog.pg\_class c\\n\\t\\t\\t\\t\\t\\t\\tJOIN pg\_catalog.pg\_namespace n ON (c.relnamespace \= n.oid )\\n\\t\\t\\t\\t\\t\\t\\tWHERE n.nspname \= 'tiger' AND c.relname \= 'geocode\_settings') )\\n\\t\\t\\tTHEN \--}{\\n\\t\\t\\t\\t-- Force install in same schema as postgis\\n\\t\\t\\t\\tSELECT INTO var\_schema n.nspname\\n\\t\\t\\t\\t  FROM pg\_namespace n, pg\_proc p\\n\\t\\t\\t\\t  WHERE p.proname \= 'postgis\_full\_version'\\n\\t\\t\\t\\t\\tAND n.oid \= p.pronamespace\\n\\t\\t\\t\\t  LIMIT 1;\\n\\t\\t\\t\\tIF rec.name NOT IN('postgis\_topology', 'postgis\_tiger\_geocoder')\\n\\t\\t\\t\\tTHEN\\n\\t\\t\\t\\t\\tsql := format(\\n\\t\\t\\t\\t\\t\\t\\t  'CREATE EXTENSION %1$I SCHEMA %2$I VERSION unpackaged;'\\n\\t\\t\\t\\t\\t\\t\\t  'ALTER EXTENSION %1$I UPDATE TO %3$I',\\n\\t\\t\\t\\t\\t\\t\\t  rec.name, var\_schema, target\_version);\\n\\t\\t\\t\\tELSE\\n\\t\\t\\t\\t\\tsql := format(\\n\\t\\t\\t\\t\\t\\t\\t 'CREATE EXTENSION %1$I VERSION unpackaged;'\\n\\t\\t\\t\\t\\t\\t\\t 'ALTER EXTENSION %1$I UPDATE TO %2$I',\\n\\t\\t\\t\\t\\t\\t\\t rec.name, target\_version);\\n\\t\\t\\t\\tEND IF;\\n\\t\\t\\t\\tRAISE NOTICE 'Packaging and updating %', rec.name;\\n\\t\\t\\t\\tRAISE DEBUG '%', sql;\\n\\t\\t\\t\\tEXECUTE sql;\\n\\t\\t\\tELSE\\n\\t\\t\\t\\tRAISE DEBUG 'Skipping % (not in use)', rec.name;\\n\\t\\t\\tEND IF;\\n\\t\\tELSE \-- IF target\_version \!= rec.installed\_version THEN \--}{\\n\\t\\t\\tsql \= '';\\n\\t\\t\\t-- If logged in as super user\\n\\t\\t\\t-- force an update regardless if at target version, no downgrade allowed\\n\\t\\t\\tIF (SELECT usesuper FROM pg\_user WHERE usename \= CURRENT\_USER)\\n\\t\\t\\t\\t\\t\\tAND pg\_catalog.substring(target\_version, '\[0-9\]+\\\\.\[0-9\]+\\\\.\[0-9\]+')\\n\\t\\t\\t\\t\\t\\t\\t\\t\>= pg\_catalog.substring(rec.installed\_version, '\[0-9\]+\\\\.\[0-9\]+\\\\.\[0-9\]+')\\n\\t\\t\\tTHEN\\n\\t\\t\\t\\tsql \= format(\\n\\t\\t\\t\\t\\t'UPDATE pg\_catalog.pg\_extension SET extversion \= ''ANY'' WHERE extname \= %1$L;'\\n\\t\\t\\t\\t\\t'ALTER EXTENSION %1$I UPDATE TO %2$I',\\n\\t\\t\\t\\t\\trec.name, target\_version\\n\\t\\t\\t\\t);\\n\\t\\t\\t-- sandboxed users do standard upgrade\\n\\t\\t\\tELSE\\n\\t\\t\\t\\tsql \= format(\\n\\t\\t\\t\\t'ALTER EXTENSION %1$I UPDATE TO %2$I',\\n\\t\\t\\t\\trec.name, target\_version\\n\\t\\t\\t\\t);\\n\\t\\t\\tEND IF;\\n\\t\\t\\tRAISE NOTICE 'Updating extension % %',\\n\\t\\t\\t\\trec.name, rec.installed\_version;\\n\\t\\t\\tRAISE DEBUG '%', sql;\\n\\t\\t\\tEXECUTE sql;\\n\\t\\tEND IF; \--}\\n\\n\\tEND LOOP; \--}\\n\\n\\tRETURN format(\\n\\t\\t'Upgrade to version %s completed, run SELECT postgis\_full\_version(); for details',\\n\\t\\ttarget\_version\\n\\t);\\n\\n\\nEND\\n$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "postgis\_full\_version",  
    "arguments": "",  
    "return\_type": "text",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.postgis\_full\_version()\\n RETURNS text\\n LANGUAGE plpgsql\\n IMMUTABLE\\nAS $function$\\nDECLARE\\n\\tlibver text;\\n\\tlibrev text;\\n\\tprojver text;\\n\\tgeosver text;\\n\\tsfcgalver text;\\n\\tgdalver text := NULL;\\n\\tlibxmlver text;\\n\\tliblwgeomver text;\\n\\tdbproc text;\\n\\trelproc text;\\n\\tfullver text;\\n\\trast\_lib\_ver text := NULL;\\n\\trast\_scr\_ver text := NULL;\\n\\ttopo\_scr\_ver text := NULL;\\n\\tjson\_lib\_ver text;\\n\\tprotobuf\_lib\_ver text;\\n\\twagyu\_lib\_ver text;\\n\\tsfcgal\_lib\_ver text;\\n\\tsfcgal\_scr\_ver text;\\n\\tpgsql\_scr\_ver text;\\n\\tpgsql\_ver text;\\n\\tcore\_is\_extension bool;\\nBEGIN\\n\\tSELECT public.postgis\_lib\_version() INTO libver;\\n\\tSELECT public.postgis\_proj\_version() INTO projver;\\n\\tSELECT public.postgis\_geos\_version() INTO geosver;\\n\\tSELECT public.postgis\_libjson\_version() INTO json\_lib\_ver;\\n\\tSELECT public.postgis\_libprotobuf\_version() INTO protobuf\_lib\_ver;\\n\\tSELECT public.postgis\_wagyu\_version() INTO wagyu\_lib\_ver;\\n\\tSELECT public.\_postgis\_scripts\_pgsql\_version() INTO pgsql\_scr\_ver;\\n\\tSELECT public.\_postgis\_pgsql\_version() INTO pgsql\_ver;\\n\\tBEGIN\\n\\t\\tSELECT public.postgis\_gdal\_version() INTO gdalver;\\n\\tEXCEPTION\\n\\t\\tWHEN undefined\_function THEN\\n\\t\\t\\tRAISE DEBUG 'Function postgis\_gdal\_version() not found.  Is raster support enabled and rtpostgis.sql installed?';\\n\\tEND;\\n\\tBEGIN\\n\\t\\tSELECT public.postgis\_sfcgal\_full\_version() INTO sfcgalver;\\n\\t\\tBEGIN\\n\\t\\t\\tSELECT public.postgis\_sfcgal\_scripts\_installed() INTO sfcgal\_scr\_ver;\\n\\t\\tEXCEPTION\\n\\t\\t\\tWHEN undefined\_function THEN\\n\\t\\t\\t\\tsfcgal\_scr\_ver := 'missing';\\n\\t\\tEND;\\n\\tEXCEPTION\\n\\t\\tWHEN undefined\_function THEN\\n\\t\\t\\tRAISE DEBUG 'Function postgis\_sfcgal\_scripts\_installed() not found. Is sfcgal support enabled and sfcgal.sql installed?';\\n\\tEND;\\n\\tSELECT public.postgis\_liblwgeom\_version() INTO liblwgeomver;\\n\\tSELECT public.postgis\_libxml\_version() INTO libxmlver;\\n\\tSELECT public.postgis\_scripts\_installed() INTO dbproc;\\n\\tSELECT public.postgis\_scripts\_released() INTO relproc;\\n\\tSELECT public.postgis\_lib\_revision() INTO librev;\\n\\tBEGIN\\n\\t\\tSELECT topology.postgis\_topology\_scripts\_installed() INTO topo\_scr\_ver;\\n\\tEXCEPTION\\n\\t\\tWHEN undefined\_function OR invalid\_schema\_name THEN\\n\\t\\t\\tRAISE DEBUG 'Function postgis\_topology\_scripts\_installed() not found. Is topology support enabled and topology.sql installed?';\\n\\t\\tWHEN insufficient\_privilege THEN\\n\\t\\t\\tRAISE NOTICE 'Topology support cannot be inspected. Is current user granted USAGE on schema \\"topology\\" ?';\\n\\t\\tWHEN OTHERS THEN\\n\\t\\t\\tRAISE NOTICE 'Function postgis\_topology\_scripts\_installed() could not be called: % (%)', SQLERRM, SQLSTATE;\\n\\tEND;\\n\\n\\tBEGIN\\n\\t\\tSELECT postgis\_raster\_scripts\_installed() INTO rast\_scr\_ver;\\n\\tEXCEPTION\\n\\t\\tWHEN undefined\_function THEN\\n\\t\\t\\tRAISE DEBUG 'Function postgis\_raster\_scripts\_installed() not found. Is raster support enabled and rtpostgis.sql installed?';\\n\\t\\tWHEN OTHERS THEN\\n\\t\\t\\tRAISE NOTICE 'Function postgis\_raster\_scripts\_installed() could not be called: % (%)', SQLERRM, SQLSTATE;\\n\\tEND;\\n\\n\\tBEGIN\\n\\t\\tSELECT public.postgis\_raster\_lib\_version() INTO rast\_lib\_ver;\\n\\tEXCEPTION\\n\\t\\tWHEN undefined\_function THEN\\n\\t\\t\\tRAISE DEBUG 'Function postgis\_raster\_lib\_version() not found. Is raster support enabled and rtpostgis.sql installed?';\\n\\t\\tWHEN OTHERS THEN\\n\\t\\t\\tRAISE NOTICE 'Function postgis\_raster\_lib\_version() could not be called: % (%)', SQLERRM, SQLSTATE;\\n\\tEND;\\n\\n\\tfullver \= 'POSTGIS=\\"' || libver;\\n\\n\\tIF  librev IS NOT NULL THEN\\n\\t\\tfullver \= fullver || ' ' || librev;\\n\\tEND IF;\\n\\n\\tfullver \= fullver || '\\"';\\n\\n\\tIF EXISTS (\\n\\t\\tSELECT \* FROM pg\_catalog.pg\_extension\\n\\t\\tWHERE extname \= 'postgis')\\n\\tTHEN\\n\\t\\t\\tfullver \= fullver || ' \[EXTENSION\]';\\n\\t\\t\\tcore\_is\_extension := true;\\n\\tELSE\\n\\t\\t\\tcore\_is\_extension := false;\\n\\tEND IF;\\n\\n\\tIF liblwgeomver \!= relproc THEN\\n\\t\\tfullver \= fullver || ' (liblwgeom version mismatch: \\"' || liblwgeomver || '\\")';\\n\\tEND IF;\\n\\n\\tfullver \= fullver || ' PGSQL=\\"' || pgsql\_scr\_ver || '\\"';\\n\\tIF pgsql\_scr\_ver \!= pgsql\_ver THEN\\n\\t\\tfullver \= fullver || ' (procs need upgrade for use with PostgreSQL \\"' || pgsql\_ver || '\\")';\\n\\tEND IF;\\n\\n\\tIF  geosver IS NOT NULL THEN\\n\\t\\tfullver \= fullver || ' GEOS=\\"' || geosver || '\\"';\\n\\tEND IF;\\n\\n\\tIF  sfcgalver IS NOT NULL THEN\\n\\t\\tfullver \= fullver || ' SFCGAL=\\"' || sfcgalver || '\\"';\\n\\tEND IF;\\n\\n\\tIF  projver IS NOT NULL THEN\\n\\t\\tfullver \= fullver || ' PROJ=\\"' || projver || '\\"';\\n\\tEND IF;\\n\\n\\tIF  gdalver IS NOT NULL THEN\\n\\t\\tfullver \= fullver || ' GDAL=\\"' || gdalver || '\\"';\\n\\tEND IF;\\n\\n\\tIF  libxmlver IS NOT NULL THEN\\n\\t\\tfullver \= fullver || ' LIBXML=\\"' || libxmlver || '\\"';\\n\\tEND IF;\\n\\n\\tIF json\_lib\_ver IS NOT NULL THEN\\n\\t\\tfullver \= fullver || ' LIBJSON=\\"' || json\_lib\_ver || '\\"';\\n\\tEND IF;\\n\\n\\tIF protobuf\_lib\_ver IS NOT NULL THEN\\n\\t\\tfullver \= fullver || ' LIBPROTOBUF=\\"' || protobuf\_lib\_ver || '\\"';\\n\\tEND IF;\\n\\n\\tIF wagyu\_lib\_ver IS NOT NULL THEN\\n\\t\\tfullver \= fullver || ' WAGYU=\\"' || wagyu\_lib\_ver || '\\"';\\n\\tEND IF;\\n\\n\\tIF dbproc \!= relproc THEN\\n\\t\\tfullver \= fullver || ' (core procs from \\"' || dbproc || '\\" need upgrade)';\\n\\tEND IF;\\n\\n\\tIF topo\_scr\_ver IS NOT NULL THEN\\n\\t\\tfullver \= fullver || ' TOPOLOGY';\\n\\t\\tIF topo\_scr\_ver \!= relproc THEN\\n\\t\\t\\tfullver \= fullver || ' (topology procs from \\"' || topo\_scr\_ver || '\\" need upgrade)';\\n\\t\\tEND IF;\\n\\t\\tIF core\_is\_extension AND NOT EXISTS (\\n\\t\\t\\tSELECT \* FROM pg\_catalog.pg\_extension\\n\\t\\t\\tWHERE extname \= 'postgis\_topology')\\n\\t\\tTHEN\\n\\t\\t\\t\\tfullver \= fullver || ' \[UNPACKAGED\!\]';\\n\\t\\tEND IF;\\n\\tEND IF;\\n\\n\\tIF rast\_lib\_ver IS NOT NULL THEN\\n\\t\\tfullver \= fullver || ' RASTER';\\n\\t\\tIF rast\_lib\_ver \!= relproc THEN\\n\\t\\t\\tfullver \= fullver || ' (raster lib from \\"' || rast\_lib\_ver || '\\" need upgrade)';\\n\\t\\tEND IF;\\n\\t\\tIF core\_is\_extension AND NOT EXISTS (\\n\\t\\t\\tSELECT \* FROM pg\_catalog.pg\_extension\\n\\t\\t\\tWHERE extname \= 'postgis\_raster')\\n\\t\\tTHEN\\n\\t\\t\\t\\tfullver \= fullver || ' \[UNPACKAGED\!\]';\\n\\t\\tEND IF;\\n\\tEND IF;\\n\\n\\tIF rast\_scr\_ver IS NOT NULL AND rast\_scr\_ver \!= relproc THEN\\n\\t\\tfullver \= fullver || ' (raster procs from \\"' || rast\_scr\_ver || '\\" need upgrade)';\\n\\tEND IF;\\n\\n\\tIF sfcgal\_scr\_ver IS NOT NULL AND sfcgal\_scr\_ver \!= relproc THEN\\n\\t\\tfullver \= fullver || ' (sfcgal procs from \\"' || sfcgal\_scr\_ver || '\\" need upgrade)';\\n\\tEND IF;\\n\\n\\t-- Check for the presence of deprecated functions\\n\\tIF EXISTS ( SELECT oid FROM pg\_catalog.pg\_proc WHERE proname LIKE '%\_deprecated\_by\_postgis\_%' )\\n\\tTHEN\\n\\t\\tfullver \= fullver || ' (deprecated functions exist, upgrade is not complete)';\\n\\tEND IF;\\n\\n\\tRETURN fullver;\\nEND\\n$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "postgis\_geos\_noop",  
    "arguments": "geometry",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.postgis\_geos\_noop(geometry)\\n RETURNS geometry\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/postgis-3', $function$GEOSnoop$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "postgis\_geos\_version",  
    "arguments": "",  
    "return\_type": "text",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.postgis\_geos\_version()\\n RETURNS text\\n LANGUAGE c\\n IMMUTABLE\\nAS '$libdir/postgis-3', $function$postgis\_geos\_version$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "postgis\_getbbox",  
    "arguments": "geometry",  
    "return\_type": "box2d",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.postgis\_getbbox(geometry)\\n RETURNS box2d\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/postgis-3', $function$LWGEOM\_to\_BOX2DF$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "postgis\_hasbbox",  
    "arguments": "geometry",  
    "return\_type": "boolean",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.postgis\_hasbbox(geometry)\\n RETURNS boolean\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/postgis-3', $function$LWGEOM\_hasBBOX$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "postgis\_index\_supportfn",  
    "arguments": "internal",  
    "return\_type": "internal",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.postgis\_index\_supportfn(internal)\\n RETURNS internal\\n LANGUAGE c\\nAS '$libdir/postgis-3', $function$postgis\_index\_supportfn$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "postgis\_lib\_build\_date",  
    "arguments": "",  
    "return\_type": "text",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.postgis\_lib\_build\_date()\\n RETURNS text\\n LANGUAGE c\\n IMMUTABLE\\nAS '$libdir/postgis-3', $function$postgis\_lib\_build\_date$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "postgis\_lib\_revision",  
    "arguments": "",  
    "return\_type": "text",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.postgis\_lib\_revision()\\n RETURNS text\\n LANGUAGE c\\n IMMUTABLE\\nAS '$libdir/postgis-3', $function$postgis\_lib\_revision$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "postgis\_lib\_version",  
    "arguments": "",  
    "return\_type": "text",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.postgis\_lib\_version()\\n RETURNS text\\n LANGUAGE c\\n IMMUTABLE\\nAS '$libdir/postgis-3', $function$postgis\_lib\_version$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "postgis\_libjson\_version",  
    "arguments": "",  
    "return\_type": "text",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.postgis\_libjson\_version()\\n RETURNS text\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/postgis-3', $function$postgis\_libjson\_version$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "postgis\_liblwgeom\_version",  
    "arguments": "",  
    "return\_type": "text",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.postgis\_liblwgeom\_version()\\n RETURNS text\\n LANGUAGE c\\n IMMUTABLE\\nAS '$libdir/postgis-3', $function$postgis\_liblwgeom\_version$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "postgis\_libprotobuf\_version",  
    "arguments": "",  
    "return\_type": "text",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.postgis\_libprotobuf\_version()\\n RETURNS text\\n LANGUAGE c\\n IMMUTABLE STRICT\\nAS '$libdir/postgis-3', $function$postgis\_libprotobuf\_version$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "postgis\_libxml\_version",  
    "arguments": "",  
    "return\_type": "text",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.postgis\_libxml\_version()\\n RETURNS text\\n LANGUAGE c\\n IMMUTABLE\\nAS '$libdir/postgis-3', $function$postgis\_libxml\_version$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "postgis\_noop",  
    "arguments": "geometry",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.postgis\_noop(geometry)\\n RETURNS geometry\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/postgis-3', $function$LWGEOM\_noop$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "postgis\_proj\_version",  
    "arguments": "",  
    "return\_type": "text",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.postgis\_proj\_version()\\n RETURNS text\\n LANGUAGE c\\n IMMUTABLE\\nAS '$libdir/postgis-3', $function$postgis\_proj\_version$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "postgis\_scripts\_build\_date",  
    "arguments": "",  
    "return\_type": "text",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.postgis\_scripts\_build\_date()\\n RETURNS text\\n LANGUAGE sql\\n IMMUTABLE\\nAS $function$SELECT '2024-09-05 22:13:41'::text AS version$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "postgis\_scripts\_installed",  
    "arguments": "",  
    "return\_type": "text",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.postgis\_scripts\_installed()\\n RETURNS text\\n LANGUAGE sql\\n IMMUTABLE\\nAS $function$ SELECT trim('3.3.7'::text || $rev$ a0c7967 $rev$) AS version $function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "postgis\_scripts\_released",  
    "arguments": "",  
    "return\_type": "text",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.postgis\_scripts\_released()\\n RETURNS text\\n LANGUAGE c\\n IMMUTABLE\\nAS '$libdir/postgis-3', $function$postgis\_scripts\_released$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "postgis\_svn\_version",  
    "arguments": "",  
    "return\_type": "text",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.postgis\_svn\_version()\\n RETURNS text\\n LANGUAGE sql\\n IMMUTABLE\\nAS $function$\\n\\tSELECT public.\_postgis\_deprecate(\\n\\t\\t'postgis\_svn\_version', 'postgis\_lib\_revision', '3.1.0');\\n\\tSELECT public.postgis\_lib\_revision();\\n$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "postgis\_transform\_geometry",  
    "arguments": "geom geometry, text, text, integer",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.postgis\_transform\_geometry(geom geometry, text, text, integer)\\n RETURNS geometry\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 500\\nAS '$libdir/postgis-3', $function$transform\_geom$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "postgis\_type\_name",  
    "arguments": "geomname character varying, coord\_dimension integer, use\_new\_name boolean DEFAULT true",  
    "return\_type": "character varying",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.postgis\_type\_name(geomname character varying, coord\_dimension integer, use\_new\_name boolean DEFAULT true)\\n RETURNS character varying\\n LANGUAGE sql\\n IMMUTABLE PARALLEL SAFE STRICT COST 10000\\nAS $function$\\n\\tSELECT CASE WHEN $3 THEN new\_name ELSE old\_name END As geomname\\n\\tFROM\\n\\t( VALUES\\n\\t\\t\\t('GEOMETRY', 'Geometry', 2),\\n\\t\\t\\t('GEOMETRY', 'GeometryZ', 3),\\n\\t\\t\\t('GEOMETRYM', 'GeometryM', 3),\\n\\t\\t\\t('GEOMETRY', 'GeometryZM', 4),\\n\\n\\t\\t\\t('GEOMETRYCOLLECTION', 'GeometryCollection', 2),\\n\\t\\t\\t('GEOMETRYCOLLECTION', 'GeometryCollectionZ', 3),\\n\\t\\t\\t('GEOMETRYCOLLECTIONM', 'GeometryCollectionM', 3),\\n\\t\\t\\t('GEOMETRYCOLLECTION', 'GeometryCollectionZM', 4),\\n\\n\\t\\t\\t('POINT', 'Point', 2),\\n\\t\\t\\t('POINT', 'PointZ', 3),\\n\\t\\t\\t('POINTM','PointM', 3),\\n\\t\\t\\t('POINT', 'PointZM', 4),\\n\\n\\t\\t\\t('MULTIPOINT','MultiPoint', 2),\\n\\t\\t\\t('MULTIPOINT','MultiPointZ', 3),\\n\\t\\t\\t('MULTIPOINTM','MultiPointM', 3),\\n\\t\\t\\t('MULTIPOINT','MultiPointZM', 4),\\n\\n\\t\\t\\t('POLYGON', 'Polygon', 2),\\n\\t\\t\\t('POLYGON', 'PolygonZ', 3),\\n\\t\\t\\t('POLYGONM', 'PolygonM', 3),\\n\\t\\t\\t('POLYGON', 'PolygonZM', 4),\\n\\n\\t\\t\\t('MULTIPOLYGON', 'MultiPolygon', 2),\\n\\t\\t\\t('MULTIPOLYGON', 'MultiPolygonZ', 3),\\n\\t\\t\\t('MULTIPOLYGONM', 'MultiPolygonM', 3),\\n\\t\\t\\t('MULTIPOLYGON', 'MultiPolygonZM', 4),\\n\\n\\t\\t\\t('MULTILINESTRING', 'MultiLineString', 2),\\n\\t\\t\\t('MULTILINESTRING', 'MultiLineStringZ', 3),\\n\\t\\t\\t('MULTILINESTRINGM', 'MultiLineStringM', 3),\\n\\t\\t\\t('MULTILINESTRING', 'MultiLineStringZM', 4),\\n\\n\\t\\t\\t('LINESTRING', 'LineString', 2),\\n\\t\\t\\t('LINESTRING', 'LineStringZ', 3),\\n\\t\\t\\t('LINESTRINGM', 'LineStringM', 3),\\n\\t\\t\\t('LINESTRING', 'LineStringZM', 4),\\n\\n\\t\\t\\t('CIRCULARSTRING', 'CircularString', 2),\\n\\t\\t\\t('CIRCULARSTRING', 'CircularStringZ', 3),\\n\\t\\t\\t('CIRCULARSTRINGM', 'CircularStringM' ,3),\\n\\t\\t\\t('CIRCULARSTRING', 'CircularStringZM', 4),\\n\\n\\t\\t\\t('COMPOUNDCURVE', 'CompoundCurve', 2),\\n\\t\\t\\t('COMPOUNDCURVE', 'CompoundCurveZ', 3),\\n\\t\\t\\t('COMPOUNDCURVEM', 'CompoundCurveM', 3),\\n\\t\\t\\t('COMPOUNDCURVE', 'CompoundCurveZM', 4),\\n\\n\\t\\t\\t('CURVEPOLYGON', 'CurvePolygon', 2),\\n\\t\\t\\t('CURVEPOLYGON', 'CurvePolygonZ', 3),\\n\\t\\t\\t('CURVEPOLYGONM', 'CurvePolygonM', 3),\\n\\t\\t\\t('CURVEPOLYGON', 'CurvePolygonZM', 4),\\n\\n\\t\\t\\t('MULTICURVE', 'MultiCurve', 2),\\n\\t\\t\\t('MULTICURVE', 'MultiCurveZ', 3),\\n\\t\\t\\t('MULTICURVEM', 'MultiCurveM', 3),\\n\\t\\t\\t('MULTICURVE', 'MultiCurveZM', 4),\\n\\n\\t\\t\\t('MULTISURFACE', 'MultiSurface', 2),\\n\\t\\t\\t('MULTISURFACE', 'MultiSurfaceZ', 3),\\n\\t\\t\\t('MULTISURFACEM', 'MultiSurfaceM', 3),\\n\\t\\t\\t('MULTISURFACE', 'MultiSurfaceZM', 4),\\n\\n\\t\\t\\t('POLYHEDRALSURFACE', 'PolyhedralSurface', 2),\\n\\t\\t\\t('POLYHEDRALSURFACE', 'PolyhedralSurfaceZ', 3),\\n\\t\\t\\t('POLYHEDRALSURFACEM', 'PolyhedralSurfaceM', 3),\\n\\t\\t\\t('POLYHEDRALSURFACE', 'PolyhedralSurfaceZM', 4),\\n\\n\\t\\t\\t('TRIANGLE', 'Triangle', 2),\\n\\t\\t\\t('TRIANGLE', 'TriangleZ', 3),\\n\\t\\t\\t('TRIANGLEM', 'TriangleM', 3),\\n\\t\\t\\t('TRIANGLE', 'TriangleZM', 4),\\n\\n\\t\\t\\t('TIN', 'Tin', 2),\\n\\t\\t\\t('TIN', 'TinZ', 3),\\n\\t\\t\\t('TINM', 'TinM', 3),\\n\\t\\t\\t('TIN', 'TinZM', 4\) )\\n\\t\\t\\t As g(old\_name, new\_name, coord\_dimension)\\n\\tWHERE (upper(old\_name) \= upper($1) OR upper(new\_name) \= upper($1))\\n\\t\\tAND coord\_dimension \= $2;\\n$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "postgis\_typmod\_dims",  
    "arguments": "integer",  
    "return\_type": "integer",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.postgis\_typmod\_dims(integer)\\n RETURNS integer\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/postgis-3', $function$postgis\_typmod\_dims$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "postgis\_typmod\_srid",  
    "arguments": "integer",  
    "return\_type": "integer",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.postgis\_typmod\_srid(integer)\\n RETURNS integer\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/postgis-3', $function$postgis\_typmod\_srid$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "postgis\_typmod\_type",  
    "arguments": "integer",  
    "return\_type": "text",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.postgis\_typmod\_type(integer)\\n RETURNS text\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/postgis-3', $function$postgis\_typmod\_type$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "postgis\_version",  
    "arguments": "",  
    "return\_type": "text",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.postgis\_version()\\n RETURNS text\\n LANGUAGE c\\n IMMUTABLE\\nAS '$libdir/postgis-3', $function$postgis\_version$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "postgis\_wagyu\_version",  
    "arguments": "",  
    "return\_type": "text",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.postgis\_wagyu\_version()\\n RETURNS text\\n LANGUAGE c\\n IMMUTABLE\\nAS '$libdir/postgis-3', $function$postgis\_wagyu\_version$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "sparsevec",  
    "arguments": "sparsevec, integer, boolean",  
    "return\_type": "sparsevec",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.sparsevec(sparsevec, integer, boolean)\\n RETURNS sparsevec\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/vector', $function$sparsevec$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "sparsevec\_cmp",  
    "arguments": "sparsevec, sparsevec",  
    "return\_type": "integer",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.sparsevec\_cmp(sparsevec, sparsevec)\\n RETURNS integer\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/vector', $function$sparsevec\_cmp$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "sparsevec\_eq",  
    "arguments": "sparsevec, sparsevec",  
    "return\_type": "boolean",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.sparsevec\_eq(sparsevec, sparsevec)\\n RETURNS boolean\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/vector', $function$sparsevec\_eq$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "sparsevec\_ge",  
    "arguments": "sparsevec, sparsevec",  
    "return\_type": "boolean",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.sparsevec\_ge(sparsevec, sparsevec)\\n RETURNS boolean\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/vector', $function$sparsevec\_ge$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "sparsevec\_gt",  
    "arguments": "sparsevec, sparsevec",  
    "return\_type": "boolean",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.sparsevec\_gt(sparsevec, sparsevec)\\n RETURNS boolean\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/vector', $function$sparsevec\_gt$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "sparsevec\_in",  
    "arguments": "cstring, oid, integer",  
    "return\_type": "sparsevec",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.sparsevec\_in(cstring, oid, integer)\\n RETURNS sparsevec\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/vector', $function$sparsevec\_in$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "sparsevec\_l2\_squared\_distance",  
    "arguments": "sparsevec, sparsevec",  
    "return\_type": "double precision",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.sparsevec\_l2\_squared\_distance(sparsevec, sparsevec)\\n RETURNS double precision\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/vector', $function$sparsevec\_l2\_squared\_distance$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "sparsevec\_le",  
    "arguments": "sparsevec, sparsevec",  
    "return\_type": "boolean",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.sparsevec\_le(sparsevec, sparsevec)\\n RETURNS boolean\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/vector', $function$sparsevec\_le$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "sparsevec\_lt",  
    "arguments": "sparsevec, sparsevec",  
    "return\_type": "boolean",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.sparsevec\_lt(sparsevec, sparsevec)\\n RETURNS boolean\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/vector', $function$sparsevec\_lt$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "sparsevec\_ne",  
    "arguments": "sparsevec, sparsevec",  
    "return\_type": "boolean",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.sparsevec\_ne(sparsevec, sparsevec)\\n RETURNS boolean\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/vector', $function$sparsevec\_ne$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "sparsevec\_negative\_inner\_product",  
    "arguments": "sparsevec, sparsevec",  
    "return\_type": "double precision",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.sparsevec\_negative\_inner\_product(sparsevec, sparsevec)\\n RETURNS double precision\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/vector', $function$sparsevec\_negative\_inner\_product$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "sparsevec\_out",  
    "arguments": "sparsevec",  
    "return\_type": "cstring",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.sparsevec\_out(sparsevec)\\n RETURNS cstring\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/vector', $function$sparsevec\_out$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "sparsevec\_recv",  
    "arguments": "internal, oid, integer",  
    "return\_type": "sparsevec",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.sparsevec\_recv(internal, oid, integer)\\n RETURNS sparsevec\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/vector', $function$sparsevec\_recv$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "sparsevec\_send",  
    "arguments": "sparsevec",  
    "return\_type": "bytea",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.sparsevec\_send(sparsevec)\\n RETURNS bytea\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/vector', $function$sparsevec\_send$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "sparsevec\_to\_halfvec",  
    "arguments": "sparsevec, integer, boolean",  
    "return\_type": "halfvec",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.sparsevec\_to\_halfvec(sparsevec, integer, boolean)\\n RETURNS halfvec\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/vector', $function$sparsevec\_to\_halfvec$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "sparsevec\_to\_vector",  
    "arguments": "sparsevec, integer, boolean",  
    "return\_type": "vector",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.sparsevec\_to\_vector(sparsevec, integer, boolean)\\n RETURNS vector\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/vector', $function$sparsevec\_to\_vector$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "sparsevec\_typmod\_in",  
    "arguments": "cstring\[\]",  
    "return\_type": "integer",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.sparsevec\_typmod\_in(cstring\[\])\\n RETURNS integer\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/vector', $function$sparsevec\_typmod\_in$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "spheroid\_in",  
    "arguments": "cstring",  
    "return\_type": "spheroid",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.spheroid\_in(cstring)\\n RETURNS spheroid\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/postgis-3', $function$ellipsoid\_in$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "spheroid\_out",  
    "arguments": "spheroid",  
    "return\_type": "cstring",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.spheroid\_out(spheroid)\\n RETURNS cstring\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/postgis-3', $function$ellipsoid\_out$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_3dclosestpoint",  
    "arguments": "geom1 geometry, geom2 geometry",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_3dclosestpoint(geom1 geometry, geom2 geometry)\\n RETURNS geometry\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 500\\nAS '$libdir/postgis-3', $function$LWGEOM\_closestpoint3d$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_3ddfullywithin",  
    "arguments": "geom1 geometry, geom2 geometry, double precision",  
    "return\_type": "boolean",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_3ddfullywithin(geom1 geometry, geom2 geometry, double precision)\\n RETURNS boolean\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 10000 SUPPORT postgis\_index\_supportfn\\nAS '$libdir/postgis-3', $function$LWGEOM\_dfullywithin3d$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_3ddistance",  
    "arguments": "geom1 geometry, geom2 geometry",  
    "return\_type": "double precision",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_3ddistance(geom1 geometry, geom2 geometry)\\n RETURNS double precision\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 500\\nAS '$libdir/postgis-3', $function$ST\_3DDistance$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_3ddwithin",  
    "arguments": "geom1 geometry, geom2 geometry, double precision",  
    "return\_type": "boolean",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_3ddwithin(geom1 geometry, geom2 geometry, double precision)\\n RETURNS boolean\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 10000 SUPPORT postgis\_index\_supportfn\\nAS '$libdir/postgis-3', $function$LWGEOM\_dwithin3d$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_3dintersects",  
    "arguments": "geom1 geometry, geom2 geometry",  
    "return\_type": "boolean",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_3dintersects(geom1 geometry, geom2 geometry)\\n RETURNS boolean\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 10000 SUPPORT postgis\_index\_supportfn\\nAS '$libdir/postgis-3', $function$ST\_3DIntersects$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_3dlength",  
    "arguments": "geometry",  
    "return\_type": "double precision",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_3dlength(geometry)\\n RETURNS double precision\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 50\\nAS '$libdir/postgis-3', $function$LWGEOM\_length\_linestring$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_3dlineinterpolatepoint",  
    "arguments": "geometry, double precision",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_3dlineinterpolatepoint(geometry, double precision)\\n RETURNS geometry\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 50\\nAS '$libdir/postgis-3', $function$ST\_3DLineInterpolatePoint$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_3dlongestline",  
    "arguments": "geom1 geometry, geom2 geometry",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_3dlongestline(geom1 geometry, geom2 geometry)\\n RETURNS geometry\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 500\\nAS '$libdir/postgis-3', $function$LWGEOM\_longestline3d$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_3dmakebox",  
    "arguments": "geom1 geometry, geom2 geometry",  
    "return\_type": "box3d",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_3dmakebox(geom1 geometry, geom2 geometry)\\n RETURNS box3d\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 50\\nAS '$libdir/postgis-3', $function$BOX3D\_construct$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_3dmaxdistance",  
    "arguments": "geom1 geometry, geom2 geometry",  
    "return\_type": "double precision",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_3dmaxdistance(geom1 geometry, geom2 geometry)\\n RETURNS double precision\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 500\\nAS '$libdir/postgis-3', $function$LWGEOM\_maxdistance3d$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_3dperimeter",  
    "arguments": "geometry",  
    "return\_type": "double precision",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_3dperimeter(geometry)\\n RETURNS double precision\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 50\\nAS '$libdir/postgis-3', $function$LWGEOM\_perimeter\_poly$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_3dshortestline",  
    "arguments": "geom1 geometry, geom2 geometry",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_3dshortestline(geom1 geometry, geom2 geometry)\\n RETURNS geometry\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 500\\nAS '$libdir/postgis-3', $function$LWGEOM\_shortestline3d$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_addmeasure",  
    "arguments": "geometry, double precision, double precision",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_addmeasure(geometry, double precision, double precision)\\n RETURNS geometry\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 500\\nAS '$libdir/postgis-3', $function$ST\_AddMeasure$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_addpoint",  
    "arguments": "geom1 geometry, geom2 geometry",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_addpoint(geom1 geometry, geom2 geometry)\\n RETURNS geometry\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 50\\nAS '$libdir/postgis-3', $function$LWGEOM\_addpoint$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_addpoint",  
    "arguments": "geom1 geometry, geom2 geometry, integer",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_addpoint(geom1 geometry, geom2 geometry, integer)\\n RETURNS geometry\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 50\\nAS '$libdir/postgis-3', $function$LWGEOM\_addpoint$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_affine",  
    "arguments": "geometry, double precision, double precision, double precision, double precision, double precision, double precision, double precision, double precision, double precision, double precision, double precision, double precision",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_affine(geometry, double precision, double precision, double precision, double precision, double precision, double precision, double precision, double precision, double precision, double precision, double precision, double precision)\\n RETURNS geometry\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 50\\nAS '$libdir/postgis-3', $function$LWGEOM\_affine$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_affine",  
    "arguments": "geometry, double precision, double precision, double precision, double precision, double precision, double precision",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_affine(geometry, double precision, double precision, double precision, double precision, double precision, double precision)\\n RETURNS geometry\\n LANGUAGE sql\\n IMMUTABLE PARALLEL SAFE STRICT COST 50\\nAS $function$SELECT public.ST\_Affine($1,  $2, $3, 0,  $4, $5, 0,  0, 0, 1,  $6, $7, 0)$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_angle",  
    "arguments": "line1 geometry, line2 geometry",  
    "return\_type": "double precision",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_angle(line1 geometry, line2 geometry)\\n RETURNS double precision\\n LANGUAGE sql\\n IMMUTABLE PARALLEL SAFE STRICT COST 50\\nAS $function$SELECT ST\_Angle(St\_StartPoint($1), ST\_EndPoint($1), St\_StartPoint($2), ST\_EndPoint($2))$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_angle",  
    "arguments": "pt1 geometry, pt2 geometry, pt3 geometry, pt4 geometry DEFAULT '0101000000000000000000F87F000000000000F87F'::geometry",  
    "return\_type": "double precision",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_angle(pt1 geometry, pt2 geometry, pt3 geometry, pt4 geometry DEFAULT '0101000000000000000000F87F000000000000F87F'::geometry)\\n RETURNS double precision\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 50\\nAS '$libdir/postgis-3', $function$LWGEOM\_angle$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_area",  
    "arguments": "geog geography, use\_spheroid boolean DEFAULT true",  
    "return\_type": "double precision",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_area(geog geography, use\_spheroid boolean DEFAULT true)\\n RETURNS double precision\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 10000\\nAS '$libdir/postgis-3', $function$geography\_area$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_area",  
    "arguments": "text",  
    "return\_type": "double precision",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_area(text)\\n RETURNS double precision\\n LANGUAGE sql\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS $function$ SELECT public.ST\_Area($1::public.geometry);  $function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_area",  
    "arguments": "geometry",  
    "return\_type": "double precision",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_area(geometry)\\n RETURNS double precision\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 50\\nAS '$libdir/postgis-3', $function$ST\_Area$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_area2d",  
    "arguments": "geometry",  
    "return\_type": "double precision",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_area2d(geometry)\\n RETURNS double precision\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 50\\nAS '$libdir/postgis-3', $function$ST\_Area$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_asbinary",  
    "arguments": "geometry, text",  
    "return\_type": "bytea",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_asbinary(geometry, text)\\n RETURNS bytea\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 50\\nAS '$libdir/postgis-3', $function$LWGEOM\_asBinary$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_asbinary",  
    "arguments": "geography, text",  
    "return\_type": "bytea",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_asbinary(geography, text)\\n RETURNS bytea\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE COST 50\\nAS '$libdir/postgis-3', $function$LWGEOM\_asBinary$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_asbinary",  
    "arguments": "geography",  
    "return\_type": "bytea",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_asbinary(geography)\\n RETURNS bytea\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 50\\nAS '$libdir/postgis-3', $function$LWGEOM\_asBinary$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_asbinary",  
    "arguments": "geometry",  
    "return\_type": "bytea",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_asbinary(geometry)\\n RETURNS bytea\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 50\\nAS '$libdir/postgis-3', $function$LWGEOM\_asBinary$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_asencodedpolyline",  
    "arguments": "geom geometry, nprecision integer DEFAULT 5",  
    "return\_type": "text",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_asencodedpolyline(geom geometry, nprecision integer DEFAULT 5)\\n RETURNS text\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 500\\nAS '$libdir/postgis-3', $function$LWGEOM\_asEncodedPolyline$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_asewkb",  
    "arguments": "geometry, text",  
    "return\_type": "bytea",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_asewkb(geometry, text)\\n RETURNS bytea\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 50\\nAS '$libdir/postgis-3', $function$WKBFromLWGEOM$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_asewkb",  
    "arguments": "geometry",  
    "return\_type": "bytea",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_asewkb(geometry)\\n RETURNS bytea\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 50\\nAS '$libdir/postgis-3', $function$WKBFromLWGEOM$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_asewkt",  
    "arguments": "geography, integer",  
    "return\_type": "text",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_asewkt(geography, integer)\\n RETURNS text\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 500\\nAS '$libdir/postgis-3', $function$LWGEOM\_asEWKT$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_asewkt",  
    "arguments": "geometry, integer",  
    "return\_type": "text",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_asewkt(geometry, integer)\\n RETURNS text\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 500\\nAS '$libdir/postgis-3', $function$LWGEOM\_asEWKT$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_asewkt",  
    "arguments": "text",  
    "return\_type": "text",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_asewkt(text)\\n RETURNS text\\n LANGUAGE sql\\n IMMUTABLE PARALLEL SAFE STRICT COST 500\\nAS $function$ SELECT public.ST\_AsEWKT($1::public.geometry);  $function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_asewkt",  
    "arguments": "geometry",  
    "return\_type": "text",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_asewkt(geometry)\\n RETURNS text\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 500\\nAS '$libdir/postgis-3', $function$LWGEOM\_asEWKT$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_asewkt",  
    "arguments": "geography",  
    "return\_type": "text",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_asewkt(geography)\\n RETURNS text\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 500\\nAS '$libdir/postgis-3', $function$LWGEOM\_asEWKT$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_asgeojson",  
    "arguments": "geom geometry, maxdecimaldigits integer DEFAULT 9, options integer DEFAULT 8",  
    "return\_type": "text",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_asgeojson(geom geometry, maxdecimaldigits integer DEFAULT 9, options integer DEFAULT 8)\\n RETURNS text\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 500\\nAS '$libdir/postgis-3', $function$LWGEOM\_asGeoJson$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_asgeojson",  
    "arguments": "r record, geom\_column text DEFAULT ''::text, maxdecimaldigits integer DEFAULT 9, pretty\_bool boolean DEFAULT false",  
    "return\_type": "text",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_asgeojson(r record, geom\_column text DEFAULT ''::text, maxdecimaldigits integer DEFAULT 9, pretty\_bool boolean DEFAULT false)\\n RETURNS text\\n LANGUAGE c\\n STABLE PARALLEL SAFE STRICT COST 500\\nAS '$libdir/postgis-3', $function$ST\_AsGeoJsonRow$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_asgeojson",  
    "arguments": "text",  
    "return\_type": "text",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_asgeojson(text)\\n RETURNS text\\n LANGUAGE sql\\n IMMUTABLE PARALLEL SAFE STRICT COST 500\\nAS $function$ SELECT public.ST\_AsGeoJson($1::public.geometry, 9, 0);  $function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_asgeojson",  
    "arguments": "geog geography, maxdecimaldigits integer DEFAULT 9, options integer DEFAULT 0",  
    "return\_type": "text",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_asgeojson(geog geography, maxdecimaldigits integer DEFAULT 9, options integer DEFAULT 0)\\n RETURNS text\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 500\\nAS '$libdir/postgis-3', $function$geography\_as\_geojson$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_asgml",  
    "arguments": "text",  
    "return\_type": "text",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_asgml(text)\\n RETURNS text\\n LANGUAGE sql\\n IMMUTABLE PARALLEL SAFE STRICT COST 500\\nAS $function$ SELECT public.\_ST\_AsGML(2,$1::public.geometry,15,0, NULL, NULL);  $function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_asgml",  
    "arguments": "geog geography, maxdecimaldigits integer DEFAULT 15, options integer DEFAULT 0, nprefix text DEFAULT 'gml'::text, id text DEFAULT ''::text",  
    "return\_type": "text",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_asgml(geog geography, maxdecimaldigits integer DEFAULT 15, options integer DEFAULT 0, nprefix text DEFAULT 'gml'::text, id text DEFAULT ''::text)\\n RETURNS text\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 500\\nAS '$libdir/postgis-3', $function$geography\_as\_gml$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_asgml",  
    "arguments": "version integer, geog geography, maxdecimaldigits integer DEFAULT 15, options integer DEFAULT 0, nprefix text DEFAULT 'gml'::text, id text DEFAULT ''::text",  
    "return\_type": "text",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_asgml(version integer, geog geography, maxdecimaldigits integer DEFAULT 15, options integer DEFAULT 0, nprefix text DEFAULT 'gml'::text, id text DEFAULT ''::text)\\n RETURNS text\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 500\\nAS '$libdir/postgis-3', $function$geography\_as\_gml$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_asgml",  
    "arguments": "geom geometry, maxdecimaldigits integer DEFAULT 15, options integer DEFAULT 0",  
    "return\_type": "text",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_asgml(geom geometry, maxdecimaldigits integer DEFAULT 15, options integer DEFAULT 0)\\n RETURNS text\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE COST 500\\nAS '$libdir/postgis-3', $function$LWGEOM\_asGML$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_asgml",  
    "arguments": "version integer, geom geometry, maxdecimaldigits integer DEFAULT 15, options integer DEFAULT 0, nprefix text DEFAULT NULL::text, id text DEFAULT NULL::text",  
    "return\_type": "text",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_asgml(version integer, geom geometry, maxdecimaldigits integer DEFAULT 15, options integer DEFAULT 0, nprefix text DEFAULT NULL::text, id text DEFAULT NULL::text)\\n RETURNS text\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE COST 500\\nAS '$libdir/postgis-3', $function$LWGEOM\_asGML$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_ashexewkb",  
    "arguments": "geometry, text",  
    "return\_type": "text",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_ashexewkb(geometry, text)\\n RETURNS text\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 50\\nAS '$libdir/postgis-3', $function$LWGEOM\_asHEXEWKB$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_ashexewkb",  
    "arguments": "geometry",  
    "return\_type": "text",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_ashexewkb(geometry)\\n RETURNS text\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 50\\nAS '$libdir/postgis-3', $function$LWGEOM\_asHEXEWKB$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_askml",  
    "arguments": "text",  
    "return\_type": "text",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_askml(text)\\n RETURNS text\\n LANGUAGE sql\\n IMMUTABLE PARALLEL SAFE STRICT COST 500\\nAS $function$ SELECT public.ST\_AsKML($1::public.geometry, 15);  $function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_askml",  
    "arguments": "geom geometry, maxdecimaldigits integer DEFAULT 15, nprefix text DEFAULT ''::text",  
    "return\_type": "text",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_askml(geom geometry, maxdecimaldigits integer DEFAULT 15, nprefix text DEFAULT ''::text)\\n RETURNS text\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 500\\nAS '$libdir/postgis-3', $function$LWGEOM\_asKML$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_askml",  
    "arguments": "geog geography, maxdecimaldigits integer DEFAULT 15, nprefix text DEFAULT ''::text",  
    "return\_type": "text",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_askml(geog geography, maxdecimaldigits integer DEFAULT 15, nprefix text DEFAULT ''::text)\\n RETURNS text\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 500\\nAS '$libdir/postgis-3', $function$geography\_as\_kml$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_aslatlontext",  
    "arguments": "geom geometry, tmpl text DEFAULT ''::text",  
    "return\_type": "text",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_aslatlontext(geom geometry, tmpl text DEFAULT ''::text)\\n RETURNS text\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 50\\nAS '$libdir/postgis-3', $function$LWGEOM\_to\_latlon$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_asmarc21",  
    "arguments": "geom geometry, format text DEFAULT 'hdddmmss'::text",  
    "return\_type": "text",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_asmarc21(geom geometry, format text DEFAULT 'hdddmmss'::text)\\n RETURNS text\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 500\\nAS '$libdir/postgis-3', $function$ST\_AsMARC21$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_asmvtgeom",  
    "arguments": "geom geometry, bounds box2d, extent integer DEFAULT 4096, buffer integer DEFAULT 256, clip\_geom boolean DEFAULT true",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_asmvtgeom(geom geometry, bounds box2d, extent integer DEFAULT 4096, buffer integer DEFAULT 256, clip\_geom boolean DEFAULT true)\\n RETURNS geometry\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE COST 500\\nAS '$libdir/postgis-3', $function$ST\_AsMVTGeom$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_assvg",  
    "arguments": "text",  
    "return\_type": "text",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_assvg(text)\\n RETURNS text\\n LANGUAGE sql\\n IMMUTABLE PARALLEL SAFE STRICT COST 500\\nAS $function$ SELECT public.ST\_AsSVG($1::public.geometry,0,15);  $function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_assvg",  
    "arguments": "geog geography, rel integer DEFAULT 0, maxdecimaldigits integer DEFAULT 15",  
    "return\_type": "text",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_assvg(geog geography, rel integer DEFAULT 0, maxdecimaldigits integer DEFAULT 15)\\n RETURNS text\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 500\\nAS '$libdir/postgis-3', $function$geography\_as\_svg$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_assvg",  
    "arguments": "geom geometry, rel integer DEFAULT 0, maxdecimaldigits integer DEFAULT 15",  
    "return\_type": "text",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_assvg(geom geometry, rel integer DEFAULT 0, maxdecimaldigits integer DEFAULT 15)\\n RETURNS text\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 500\\nAS '$libdir/postgis-3', $function$LWGEOM\_asSVG$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_astext",  
    "arguments": "geography, integer",  
    "return\_type": "text",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_astext(geography, integer)\\n RETURNS text\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 500\\nAS '$libdir/postgis-3', $function$LWGEOM\_asText$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_astext",  
    "arguments": "geometry",  
    "return\_type": "text",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_astext(geometry)\\n RETURNS text\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 500\\nAS '$libdir/postgis-3', $function$LWGEOM\_asText$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_astext",  
    "arguments": "geometry, integer",  
    "return\_type": "text",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_astext(geometry, integer)\\n RETURNS text\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 500\\nAS '$libdir/postgis-3', $function$LWGEOM\_asText$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_astext",  
    "arguments": "geography",  
    "return\_type": "text",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_astext(geography)\\n RETURNS text\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 500\\nAS '$libdir/postgis-3', $function$LWGEOM\_asText$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_astext",  
    "arguments": "text",  
    "return\_type": "text",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_astext(text)\\n RETURNS text\\n LANGUAGE sql\\n IMMUTABLE PARALLEL SAFE STRICT COST 500\\nAS $function$ SELECT public.ST\_AsText($1::public.geometry);  $function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_astwkb",  
    "arguments": "geom geometry\[\], ids bigint\[\], prec integer DEFAULT NULL::integer, prec\_z integer DEFAULT NULL::integer, prec\_m integer DEFAULT NULL::integer, with\_sizes boolean DEFAULT NULL::boolean, with\_boxes boolean DEFAULT NULL::boolean",  
    "return\_type": "bytea",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_astwkb(geom geometry\[\], ids bigint\[\], prec integer DEFAULT NULL::integer, prec\_z integer DEFAULT NULL::integer, prec\_m integer DEFAULT NULL::integer, with\_sizes boolean DEFAULT NULL::boolean, with\_boxes boolean DEFAULT NULL::boolean)\\n RETURNS bytea\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE COST 50\\nAS '$libdir/postgis-3', $function$TWKBFromLWGEOMArray$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_astwkb",  
    "arguments": "geom geometry, prec integer DEFAULT NULL::integer, prec\_z integer DEFAULT NULL::integer, prec\_m integer DEFAULT NULL::integer, with\_sizes boolean DEFAULT NULL::boolean, with\_boxes boolean DEFAULT NULL::boolean",  
    "return\_type": "bytea",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_astwkb(geom geometry, prec integer DEFAULT NULL::integer, prec\_z integer DEFAULT NULL::integer, prec\_m integer DEFAULT NULL::integer, with\_sizes boolean DEFAULT NULL::boolean, with\_boxes boolean DEFAULT NULL::boolean)\\n RETURNS bytea\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE COST 50\\nAS '$libdir/postgis-3', $function$TWKBFromLWGEOM$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_asx3d",  
    "arguments": "geom geometry, maxdecimaldigits integer DEFAULT 15, options integer DEFAULT 0",  
    "return\_type": "text",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_asx3d(geom geometry, maxdecimaldigits integer DEFAULT 15, options integer DEFAULT 0)\\n RETURNS text\\n LANGUAGE sql\\n IMMUTABLE PARALLEL SAFE COST 500\\nAS $function$SELECT public.\_ST\_AsX3D(3,$1,$2,$3,'');$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_azimuth",  
    "arguments": "geog1 geography, geog2 geography",  
    "return\_type": "double precision",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_azimuth(geog1 geography, geog2 geography)\\n RETURNS double precision\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 500\\nAS '$libdir/postgis-3', $function$geography\_azimuth$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_azimuth",  
    "arguments": "geom1 geometry, geom2 geometry",  
    "return\_type": "double precision",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_azimuth(geom1 geometry, geom2 geometry)\\n RETURNS double precision\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 50\\nAS '$libdir/postgis-3', $function$LWGEOM\_azimuth$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_bdmpolyfromtext",  
    "arguments": "text, integer",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_bdmpolyfromtext(text, integer)\\n RETURNS geometry\\n LANGUAGE plpgsql\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS $function$\\nDECLARE\\n\\tgeomtext alias for $1;\\n\\tsrid alias for $2;\\n\\tmline public.geometry;\\n\\tgeom public.geometry;\\nBEGIN\\n\\tmline := public.ST\_MultiLineStringFromText(geomtext, srid);\\n\\n\\tIF mline IS NULL\\n\\tTHEN\\n\\t\\tRAISE EXCEPTION 'Input is not a MultiLinestring';\\n\\tEND IF;\\n\\n\\tgeom := public.ST\_Multi(public.ST\_BuildArea(mline));\\n\\n\\tRETURN geom;\\nEND;\\n$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_bdpolyfromtext",  
    "arguments": "text, integer",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_bdpolyfromtext(text, integer)\\n RETURNS geometry\\n LANGUAGE plpgsql\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS $function$\\nDECLARE\\n\\tgeomtext alias for $1;\\n\\tsrid alias for $2;\\n\\tmline public.geometry;\\n\\tgeom public.geometry;\\nBEGIN\\n\\tmline := public.ST\_MultiLineStringFromText(geomtext, srid);\\n\\n\\tIF mline IS NULL\\n\\tTHEN\\n\\t\\tRAISE EXCEPTION 'Input is not a MultiLinestring';\\n\\tEND IF;\\n\\n\\tgeom := public.ST\_BuildArea(mline);\\n\\n\\tIF public.GeometryType(geom) \!= 'POLYGON'\\n\\tTHEN\\n\\t\\tRAISE EXCEPTION 'Input returns more then a single polygon, try using BdMPolyFromText instead';\\n\\tEND IF;\\n\\n\\tRETURN geom;\\nEND;\\n$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_boundary",  
    "arguments": "geometry",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_boundary(geometry)\\n RETURNS geometry\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 500\\nAS '$libdir/postgis-3', $function$boundary$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_boundingdiagonal",  
    "arguments": "geom geometry, fits boolean DEFAULT false",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_boundingdiagonal(geom geometry, fits boolean DEFAULT false)\\n RETURNS geometry\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/postgis-3', $function$ST\_BoundingDiagonal$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_box2dfromgeohash",  
    "arguments": "text, integer DEFAULT NULL::integer",  
    "return\_type": "box2d",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_box2dfromgeohash(text, integer DEFAULT NULL::integer)\\n RETURNS box2d\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE COST 50\\nAS '$libdir/postgis-3', $function$box2d\_from\_geohash$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_buffer",  
    "arguments": "geom geometry, radius double precision, quadsegs integer",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_buffer(geom geometry, radius double precision, quadsegs integer)\\n RETURNS geometry\\n LANGUAGE sql\\n IMMUTABLE PARALLEL SAFE STRICT COST 10000\\nAS $function$ SELECT public.ST\_Buffer($1, $2, CAST('quad\_segs='||CAST($3 AS text) as text)) $function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_buffer",  
    "arguments": "text, double precision",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_buffer(text, double precision)\\n RETURNS geometry\\n LANGUAGE sql\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS $function$ SELECT public.ST\_Buffer($1::public.geometry, $2);  $function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_buffer",  
    "arguments": "geography, double precision, text",  
    "return\_type": "geography",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_buffer(geography, double precision, text)\\n RETURNS geography\\n LANGUAGE sql\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS $function$SELECT public.geography(public.ST\_Transform(public.ST\_Buffer(public.ST\_Transform(public.geometry($1), public.\_ST\_BestSRID($1)), $2, $3), public.ST\_SRID($1)))$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_buffer",  
    "arguments": "text, double precision, integer",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_buffer(text, double precision, integer)\\n RETURNS geometry\\n LANGUAGE sql\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS $function$ SELECT public.ST\_Buffer($1::public.geometry, $2, $3);  $function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_buffer",  
    "arguments": "text, double precision, text",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_buffer(text, double precision, text)\\n RETURNS geometry\\n LANGUAGE sql\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS $function$ SELECT public.ST\_Buffer($1::public.geometry, $2, $3);  $function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_buffer",  
    "arguments": "geography, double precision, integer",  
    "return\_type": "geography",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_buffer(geography, double precision, integer)\\n RETURNS geography\\n LANGUAGE sql\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS $function$SELECT public.geography(public.ST\_Transform(public.ST\_Buffer(public.ST\_Transform(public.geometry($1), public.\_ST\_BestSRID($1)), $2, $3), public.ST\_SRID($1)))$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_buffer",  
    "arguments": "geography, double precision",  
    "return\_type": "geography",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_buffer(geography, double precision)\\n RETURNS geography\\n LANGUAGE sql\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS $function$SELECT public.geography(public.ST\_Transform(public.ST\_Buffer(public.ST\_Transform(public.geometry($1), public.\_ST\_BestSRID($1)), $2), public.ST\_SRID($1)))$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_buffer",  
    "arguments": "geom geometry, radius double precision, options text DEFAULT ''::text",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_buffer(geom geometry, radius double precision, options text DEFAULT ''::text)\\n RETURNS geometry\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 10000\\nAS '$libdir/postgis-3', $function$buffer$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_buildarea",  
    "arguments": "geometry",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_buildarea(geometry)\\n RETURNS geometry\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 10000\\nAS '$libdir/postgis-3', $function$ST\_BuildArea$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_centroid",  
    "arguments": "geography, use\_spheroid boolean DEFAULT true",  
    "return\_type": "geography",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_centroid(geography, use\_spheroid boolean DEFAULT true)\\n RETURNS geography\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 500\\nAS '$libdir/postgis-3', $function$geography\_centroid$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_centroid",  
    "arguments": "geometry",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_centroid(geometry)\\n RETURNS geometry\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 500\\nAS '$libdir/postgis-3', $function$centroid$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_centroid",  
    "arguments": "text",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_centroid(text)\\n RETURNS geometry\\n LANGUAGE sql\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS $function$ SELECT public.ST\_Centroid($1::public.geometry);  $function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_chaikinsmoothing",  
    "arguments": "geometry, integer DEFAULT 1, boolean DEFAULT false",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_chaikinsmoothing(geometry, integer DEFAULT 1, boolean DEFAULT false)\\n RETURNS geometry\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 500\\nAS '$libdir/postgis-3', $function$LWGEOM\_ChaikinSmoothing$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_cleangeometry",  
    "arguments": "geometry",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_cleangeometry(geometry)\\n RETURNS geometry\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 10000\\nAS '$libdir/postgis-3', $function$ST\_CleanGeometry$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_clipbybox2d",  
    "arguments": "geom geometry, box box2d",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_clipbybox2d(geom geometry, box box2d)\\n RETURNS geometry\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 500\\nAS '$libdir/postgis-3', $function$ST\_ClipByBox2d$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_closestpoint",  
    "arguments": "geom1 geometry, geom2 geometry",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_closestpoint(geom1 geometry, geom2 geometry)\\n RETURNS geometry\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 500\\nAS '$libdir/postgis-3', $function$LWGEOM\_closestpoint$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_closestpointofapproach",  
    "arguments": "geometry, geometry",  
    "return\_type": "double precision",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_closestpointofapproach(geometry, geometry)\\n RETURNS double precision\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 10000\\nAS '$libdir/postgis-3', $function$ST\_ClosestPointOfApproach$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_clusterintersecting",  
    "arguments": "geometry\[\]",  
    "return\_type": "geometry\[\]",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_clusterintersecting(geometry\[\])\\n RETURNS geometry\[\]\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 10000\\nAS '$libdir/postgis-3', $function$clusterintersecting\_garray$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_clusterwithin",  
    "arguments": "geometry\[\], double precision",  
    "return\_type": "geometry\[\]",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_clusterwithin(geometry\[\], double precision)\\n RETURNS geometry\[\]\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 10000\\nAS '$libdir/postgis-3', $function$cluster\_within\_distance\_garray$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_collect",  
    "arguments": "geom1 geometry, geom2 geometry",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_collect(geom1 geometry, geom2 geometry)\\n RETURNS geometry\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE COST 50\\nAS '$libdir/postgis-3', $function$LWGEOM\_collect$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_collect",  
    "arguments": "geometry\[\]",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_collect(geometry\[\])\\n RETURNS geometry\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 50\\nAS '$libdir/postgis-3', $function$LWGEOM\_collect\_garray$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_collectionextract",  
    "arguments": "geometry, integer",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_collectionextract(geometry, integer)\\n RETURNS geometry\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 50\\nAS '$libdir/postgis-3', $function$ST\_CollectionExtract$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_collectionextract",  
    "arguments": "geometry",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_collectionextract(geometry)\\n RETURNS geometry\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 50\\nAS '$libdir/postgis-3', $function$ST\_CollectionExtract$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_collectionhomogenize",  
    "arguments": "geometry",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_collectionhomogenize(geometry)\\n RETURNS geometry\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 50\\nAS '$libdir/postgis-3', $function$ST\_CollectionHomogenize$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_combinebbox",  
    "arguments": "box2d, geometry",  
    "return\_type": "box2d",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_combinebbox(box2d, geometry)\\n RETURNS box2d\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE\\nAS '$libdir/postgis-3', $function$BOX2D\_combine$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_combinebbox",  
    "arguments": "box3d, geometry",  
    "return\_type": "box3d",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_combinebbox(box3d, geometry)\\n RETURNS box3d\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE COST 50\\nAS '$libdir/postgis-3', $function$BOX3D\_combine$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_combinebbox",  
    "arguments": "box3d, box3d",  
    "return\_type": "box3d",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_combinebbox(box3d, box3d)\\n RETURNS box3d\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE COST 50\\nAS '$libdir/postgis-3', $function$BOX3D\_combine\_BOX3D$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_concavehull",  
    "arguments": "param\_geom geometry, param\_pctconvex double precision, param\_allow\_holes boolean DEFAULT false",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_concavehull(param\_geom geometry, param\_pctconvex double precision, param\_allow\_holes boolean DEFAULT false)\\n RETURNS geometry\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 10000\\nAS '$libdir/postgis-3', $function$ST\_ConcaveHull$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_contains",  
    "arguments": "geom1 geometry, geom2 geometry",  
    "return\_type": "boolean",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_contains(geom1 geometry, geom2 geometry)\\n RETURNS boolean\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 10000 SUPPORT postgis\_index\_supportfn\\nAS '$libdir/postgis-3', $function$contains$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_containsproperly",  
    "arguments": "geom1 geometry, geom2 geometry",  
    "return\_type": "boolean",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_containsproperly(geom1 geometry, geom2 geometry)\\n RETURNS boolean\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 10000 SUPPORT postgis\_index\_supportfn\\nAS '$libdir/postgis-3', $function$containsproperly$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_convexhull",  
    "arguments": "geometry",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_convexhull(geometry)\\n RETURNS geometry\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 10000\\nAS '$libdir/postgis-3', $function$convexhull$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_coorddim",  
    "arguments": "geometry geometry",  
    "return\_type": "smallint",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_coorddim(geometry geometry)\\n RETURNS smallint\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/postgis-3', $function$LWGEOM\_ndims$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_coveredby",  
    "arguments": "geog1 geography, geog2 geography",  
    "return\_type": "boolean",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_coveredby(geog1 geography, geog2 geography)\\n RETURNS boolean\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 10000 SUPPORT postgis\_index\_supportfn\\nAS '$libdir/postgis-3', $function$geography\_coveredby$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_coveredby",  
    "arguments": "geom1 geometry, geom2 geometry",  
    "return\_type": "boolean",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_coveredby(geom1 geometry, geom2 geometry)\\n RETURNS boolean\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 10000 SUPPORT postgis\_index\_supportfn\\nAS '$libdir/postgis-3', $function$coveredby$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_coveredby",  
    "arguments": "text, text",  
    "return\_type": "boolean",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_coveredby(text, text)\\n RETURNS boolean\\n LANGUAGE sql\\n IMMUTABLE PARALLEL SAFE\\nAS $function$ SELECT public.ST\_CoveredBy($1::public.geometry, $2::public.geometry);  $function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_covers",  
    "arguments": "geog1 geography, geog2 geography",  
    "return\_type": "boolean",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_covers(geog1 geography, geog2 geography)\\n RETURNS boolean\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 10000 SUPPORT postgis\_index\_supportfn\\nAS '$libdir/postgis-3', $function$geography\_covers$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_covers",  
    "arguments": "geom1 geometry, geom2 geometry",  
    "return\_type": "boolean",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_covers(geom1 geometry, geom2 geometry)\\n RETURNS boolean\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 10000 SUPPORT postgis\_index\_supportfn\\nAS '$libdir/postgis-3', $function$covers$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_covers",  
    "arguments": "text, text",  
    "return\_type": "boolean",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_covers(text, text)\\n RETURNS boolean\\n LANGUAGE sql\\n IMMUTABLE PARALLEL SAFE\\nAS $function$ SELECT public.ST\_Covers($1::public.geometry, $2::public.geometry);  $function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_cpawithin",  
    "arguments": "geometry, geometry, double precision",  
    "return\_type": "boolean",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_cpawithin(geometry, geometry, double precision)\\n RETURNS boolean\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 10000\\nAS '$libdir/postgis-3', $function$ST\_CPAWithin$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_crosses",  
    "arguments": "geom1 geometry, geom2 geometry",  
    "return\_type": "boolean",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_crosses(geom1 geometry, geom2 geometry)\\n RETURNS boolean\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 10000 SUPPORT postgis\_index\_supportfn\\nAS '$libdir/postgis-3', $function$crosses$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_curvetoline",  
    "arguments": "geom geometry, tol double precision DEFAULT 32, toltype integer DEFAULT 0, flags integer DEFAULT 0",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_curvetoline(geom geometry, tol double precision DEFAULT 32, toltype integer DEFAULT 0, flags integer DEFAULT 0)\\n RETURNS geometry\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 10000\\nAS '$libdir/postgis-3', $function$ST\_CurveToLine$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_delaunaytriangles",  
    "arguments": "g1 geometry, tolerance double precision DEFAULT 0.0, flags integer DEFAULT 0",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_delaunaytriangles(g1 geometry, tolerance double precision DEFAULT 0.0, flags integer DEFAULT 0)\\n RETURNS geometry\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 10000\\nAS '$libdir/postgis-3', $function$ST\_DelaunayTriangles$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_dfullywithin",  
    "arguments": "geom1 geometry, geom2 geometry, double precision",  
    "return\_type": "boolean",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_dfullywithin(geom1 geometry, geom2 geometry, double precision)\\n RETURNS boolean\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 10000 SUPPORT postgis\_index\_supportfn\\nAS '$libdir/postgis-3', $function$LWGEOM\_dfullywithin$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_difference",  
    "arguments": "geom1 geometry, geom2 geometry, gridsize double precision DEFAULT '-1.0'::numeric",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_difference(geom1 geometry, geom2 geometry, gridsize double precision DEFAULT '-1.0'::numeric)\\n RETURNS geometry\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 10000\\nAS '$libdir/postgis-3', $function$ST\_Difference$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_dimension",  
    "arguments": "geometry",  
    "return\_type": "integer",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_dimension(geometry)\\n RETURNS integer\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 50\\nAS '$libdir/postgis-3', $function$LWGEOM\_dimension$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_disjoint",  
    "arguments": "geom1 geometry, geom2 geometry",  
    "return\_type": "boolean",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_disjoint(geom1 geometry, geom2 geometry)\\n RETURNS boolean\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 10000\\nAS '$libdir/postgis-3', $function$disjoint$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_distance",  
    "arguments": "geom1 geometry, geom2 geometry",  
    "return\_type": "double precision",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_distance(geom1 geometry, geom2 geometry)\\n RETURNS double precision\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 10000\\nAS '$libdir/postgis-3', $function$ST\_Distance$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_distance",  
    "arguments": "text, text",  
    "return\_type": "double precision",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_distance(text, text)\\n RETURNS double precision\\n LANGUAGE sql\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS $function$ SELECT public.ST\_Distance($1::public.geometry, $2::public.geometry);  $function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_distance",  
    "arguments": "geog1 geography, geog2 geography, use\_spheroid boolean DEFAULT true",  
    "return\_type": "double precision",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_distance(geog1 geography, geog2 geography, use\_spheroid boolean DEFAULT true)\\n RETURNS double precision\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 10000\\nAS '$libdir/postgis-3', $function$geography\_distance$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_distancecpa",  
    "arguments": "geometry, geometry",  
    "return\_type": "double precision",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_distancecpa(geometry, geometry)\\n RETURNS double precision\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 10000\\nAS '$libdir/postgis-3', $function$ST\_DistanceCPA$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_distancesphere",  
    "arguments": "geom1 geometry, geom2 geometry, radius double precision",  
    "return\_type": "double precision",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_distancesphere(geom1 geometry, geom2 geometry, radius double precision)\\n RETURNS double precision\\n LANGUAGE c\\n IMMUTABLE STRICT COST 10000\\nAS '$libdir/postgis-3', $function$LWGEOM\_distance\_sphere$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_distancesphere",  
    "arguments": "geom1 geometry, geom2 geometry",  
    "return\_type": "double precision",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_distancesphere(geom1 geometry, geom2 geometry)\\n RETURNS double precision\\n LANGUAGE sql\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS $function$select public.ST\_distance( public.geography($1), public.geography($2),false)$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_distancespheroid",  
    "arguments": "geom1 geometry, geom2 geometry",  
    "return\_type": "double precision",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_distancespheroid(geom1 geometry, geom2 geometry)\\n RETURNS double precision\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 500\\nAS '$libdir/postgis-3', $function$LWGEOM\_distance\_ellipsoid$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_distancespheroid",  
    "arguments": "geom1 geometry, geom2 geometry, spheroid",  
    "return\_type": "double precision",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_distancespheroid(geom1 geometry, geom2 geometry, spheroid)\\n RETURNS double precision\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 500\\nAS '$libdir/postgis-3', $function$LWGEOM\_distance\_ellipsoid$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_dump",  
    "arguments": "geometry",  
    "return\_type": "SETOF geometry\_dump",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_dump(geometry)\\n RETURNS SETOF geometry\_dump\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 500\\nAS '$libdir/postgis-3', $function$LWGEOM\_dump$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_dumppoints",  
    "arguments": "geometry",  
    "return\_type": "SETOF geometry\_dump",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_dumppoints(geometry)\\n RETURNS SETOF geometry\_dump\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 10000\\nAS '$libdir/postgis-3', $function$LWGEOM\_dumppoints$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_dumprings",  
    "arguments": "geometry",  
    "return\_type": "SETOF geometry\_dump",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_dumprings(geometry)\\n RETURNS SETOF geometry\_dump\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 500\\nAS '$libdir/postgis-3', $function$LWGEOM\_dump\_rings$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_dumpsegments",  
    "arguments": "geometry",  
    "return\_type": "SETOF geometry\_dump",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_dumpsegments(geometry)\\n RETURNS SETOF geometry\_dump\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 10000\\nAS '$libdir/postgis-3', $function$LWGEOM\_dumpsegments$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_dwithin",  
    "arguments": "text, text, double precision",  
    "return\_type": "boolean",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_dwithin(text, text, double precision)\\n RETURNS boolean\\n LANGUAGE sql\\n IMMUTABLE PARALLEL SAFE\\nAS $function$ SELECT public.ST\_DWithin($1::public.geometry, $2::public.geometry, $3);  $function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_dwithin",  
    "arguments": "geog1 geography, geog2 geography, tolerance double precision, use\_spheroid boolean DEFAULT true",  
    "return\_type": "boolean",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_dwithin(geog1 geography, geog2 geography, tolerance double precision, use\_spheroid boolean DEFAULT true)\\n RETURNS boolean\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 10000 SUPPORT postgis\_index\_supportfn\\nAS '$libdir/postgis-3', $function$geography\_dwithin$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_dwithin",  
    "arguments": "geom1 geometry, geom2 geometry, double precision",  
    "return\_type": "boolean",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_dwithin(geom1 geometry, geom2 geometry, double precision)\\n RETURNS boolean\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 10000 SUPPORT postgis\_index\_supportfn\\nAS '$libdir/postgis-3', $function$LWGEOM\_dwithin$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_endpoint",  
    "arguments": "geometry",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_endpoint(geometry)\\n RETURNS geometry\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 50\\nAS '$libdir/postgis-3', $function$LWGEOM\_endpoint\_linestring$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_envelope",  
    "arguments": "geometry",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_envelope(geometry)\\n RETURNS geometry\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 50\\nAS '$libdir/postgis-3', $function$LWGEOM\_envelope$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_equals",  
    "arguments": "geom1 geometry, geom2 geometry",  
    "return\_type": "boolean",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_equals(geom1 geometry, geom2 geometry)\\n RETURNS boolean\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 10000 SUPPORT postgis\_index\_supportfn\\nAS '$libdir/postgis-3', $function$ST\_Equals$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_estimatedextent",  
    "arguments": "text, text, text, boolean",  
    "return\_type": "box2d",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_estimatedextent(text, text, text, boolean)\\n RETURNS box2d\\n LANGUAGE c\\n STABLE STRICT SECURITY DEFINER\\nAS '$libdir/postgis-3', $function$gserialized\_estimated\_extent$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_estimatedextent",  
    "arguments": "text, text, text",  
    "return\_type": "box2d",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_estimatedextent(text, text, text)\\n RETURNS box2d\\n LANGUAGE c\\n STABLE STRICT SECURITY DEFINER\\nAS '$libdir/postgis-3', $function$gserialized\_estimated\_extent$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_estimatedextent",  
    "arguments": "text, text",  
    "return\_type": "box2d",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_estimatedextent(text, text)\\n RETURNS box2d\\n LANGUAGE c\\n STABLE STRICT SECURITY DEFINER\\nAS '$libdir/postgis-3', $function$gserialized\_estimated\_extent$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_expand",  
    "arguments": "geometry, double precision",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_expand(geometry, double precision)\\n RETURNS geometry\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 50\\nAS '$libdir/postgis-3', $function$LWGEOM\_expand$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_expand",  
    "arguments": "geom geometry, dx double precision, dy double precision, dz double precision DEFAULT 0, dm double precision DEFAULT 0",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_expand(geom geometry, dx double precision, dy double precision, dz double precision DEFAULT 0, dm double precision DEFAULT 0)\\n RETURNS geometry\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 50\\nAS '$libdir/postgis-3', $function$LWGEOM\_expand$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_expand",  
    "arguments": "box box3d, dx double precision, dy double precision, dz double precision DEFAULT 0",  
    "return\_type": "box3d",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_expand(box box3d, dx double precision, dy double precision, dz double precision DEFAULT 0)\\n RETURNS box3d\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 50\\nAS '$libdir/postgis-3', $function$BOX3D\_expand$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_expand",  
    "arguments": "box3d, double precision",  
    "return\_type": "box3d",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_expand(box3d, double precision)\\n RETURNS box3d\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 50\\nAS '$libdir/postgis-3', $function$BOX3D\_expand$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_expand",  
    "arguments": "box box2d, dx double precision, dy double precision",  
    "return\_type": "box2d",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_expand(box box2d, dx double precision, dy double precision)\\n RETURNS box2d\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/postgis-3', $function$BOX2D\_expand$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_expand",  
    "arguments": "box2d, double precision",  
    "return\_type": "box2d",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_expand(box2d, double precision)\\n RETURNS box2d\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/postgis-3', $function$BOX2D\_expand$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_exteriorring",  
    "arguments": "geometry",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_exteriorring(geometry)\\n RETURNS geometry\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 50\\nAS '$libdir/postgis-3', $function$LWGEOM\_exteriorring\_polygon$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_filterbym",  
    "arguments": "geometry, double precision, double precision DEFAULT NULL::double precision, boolean DEFAULT false",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_filterbym(geometry, double precision, double precision DEFAULT NULL::double precision, boolean DEFAULT false)\\n RETURNS geometry\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE COST 50\\nAS '$libdir/postgis-3', $function$LWGEOM\_FilterByM$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_findextent",  
    "arguments": "text, text, text",  
    "return\_type": "box2d",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_findextent(text, text, text)\\n RETURNS box2d\\n LANGUAGE plpgsql\\n STABLE PARALLEL SAFE STRICT\\nAS $function$\\nDECLARE\\n\\tschemaname alias for $1;\\n\\ttablename alias for $2;\\n\\tcolumnname alias for $3;\\n\\tmyrec RECORD;\\nBEGIN\\n\\tFOR myrec IN EXECUTE 'SELECT public.ST\_Extent(\\"' || columnname || '\\") As extent FROM \\"' || schemaname || '\\".\\"' || tablename || '\\"' LOOP\\n\\t\\treturn myrec.extent;\\n\\tEND LOOP;\\nEND;\\n$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_findextent",  
    "arguments": "text, text",  
    "return\_type": "box2d",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_findextent(text, text)\\n RETURNS box2d\\n LANGUAGE plpgsql\\n STABLE PARALLEL SAFE STRICT\\nAS $function$\\nDECLARE\\n\\ttablename alias for $1;\\n\\tcolumnname alias for $2;\\n\\tmyrec RECORD;\\n\\nBEGIN\\n\\tFOR myrec IN EXECUTE 'SELECT public.ST\_Extent(\\"' || columnname || '\\") As extent FROM \\"' || tablename || '\\"' LOOP\\n\\t\\treturn myrec.extent;\\n\\tEND LOOP;\\nEND;\\n$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_flipcoordinates",  
    "arguments": "geometry",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_flipcoordinates(geometry)\\n RETURNS geometry\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 50\\nAS '$libdir/postgis-3', $function$ST\_FlipCoordinates$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_force2d",  
    "arguments": "geometry",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_force2d(geometry)\\n RETURNS geometry\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 50\\nAS '$libdir/postgis-3', $function$LWGEOM\_force\_2d$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_force3d",  
    "arguments": "geom geometry, zvalue double precision DEFAULT 0.0",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_force3d(geom geometry, zvalue double precision DEFAULT 0.0)\\n RETURNS geometry\\n LANGUAGE sql\\n IMMUTABLE PARALLEL SAFE STRICT COST 50\\nAS $function$SELECT public.ST\_Force3DZ($1, $2)$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_force3dm",  
    "arguments": "geom geometry, mvalue double precision DEFAULT 0.0",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_force3dm(geom geometry, mvalue double precision DEFAULT 0.0)\\n RETURNS geometry\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 50\\nAS '$libdir/postgis-3', $function$LWGEOM\_force\_3dm$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_force3dz",  
    "arguments": "geom geometry, zvalue double precision DEFAULT 0.0",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_force3dz(geom geometry, zvalue double precision DEFAULT 0.0)\\n RETURNS geometry\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 50\\nAS '$libdir/postgis-3', $function$LWGEOM\_force\_3dz$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_force4d",  
    "arguments": "geom geometry, zvalue double precision DEFAULT 0.0, mvalue double precision DEFAULT 0.0",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_force4d(geom geometry, zvalue double precision DEFAULT 0.0, mvalue double precision DEFAULT 0.0)\\n RETURNS geometry\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 50\\nAS '$libdir/postgis-3', $function$LWGEOM\_force\_4d$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_forcecollection",  
    "arguments": "geometry",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_forcecollection(geometry)\\n RETURNS geometry\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 50\\nAS '$libdir/postgis-3', $function$LWGEOM\_force\_collection$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_forcecurve",  
    "arguments": "geometry",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_forcecurve(geometry)\\n RETURNS geometry\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 500\\nAS '$libdir/postgis-3', $function$LWGEOM\_force\_curve$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_forcepolygonccw",  
    "arguments": "geometry",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_forcepolygonccw(geometry)\\n RETURNS geometry\\n LANGUAGE sql\\n IMMUTABLE PARALLEL SAFE STRICT COST 50\\nAS $function$ SELECT public.ST\_Reverse(public.ST\_ForcePolygonCW($1)) $function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_forcepolygoncw",  
    "arguments": "geometry",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_forcepolygoncw(geometry)\\n RETURNS geometry\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 50\\nAS '$libdir/postgis-3', $function$LWGEOM\_force\_clockwise\_poly$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_forcerhr",  
    "arguments": "geometry",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_forcerhr(geometry)\\n RETURNS geometry\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 50\\nAS '$libdir/postgis-3', $function$LWGEOM\_force\_clockwise\_poly$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_forcesfs",  
    "arguments": "geometry, version text",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_forcesfs(geometry, version text)\\n RETURNS geometry\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 500\\nAS '$libdir/postgis-3', $function$LWGEOM\_force\_sfs$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_forcesfs",  
    "arguments": "geometry",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_forcesfs(geometry)\\n RETURNS geometry\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 500\\nAS '$libdir/postgis-3', $function$LWGEOM\_force\_sfs$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_frechetdistance",  
    "arguments": "geom1 geometry, geom2 geometry, double precision DEFAULT '-1'::integer",  
    "return\_type": "double precision",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_frechetdistance(geom1 geometry, geom2 geometry, double precision DEFAULT '-1'::integer)\\n RETURNS double precision\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 10000\\nAS '$libdir/postgis-3', $function$ST\_FrechetDistance$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_fromflatgeobuf",  
    "arguments": "anyelement, bytea",  
    "return\_type": "SETOF anyelement",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_fromflatgeobuf(anyelement, bytea)\\n RETURNS SETOF anyelement\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE COST 500\\nAS '$libdir/postgis-3', $function$pgis\_fromflatgeobuf$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_fromflatgeobuftotable",  
    "arguments": "text, text, bytea",  
    "return\_type": "void",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_fromflatgeobuftotable(text, text, bytea)\\n RETURNS void\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 500\\nAS '$libdir/postgis-3', $function$pgis\_tablefromflatgeobuf$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_generatepoints",  
    "arguments": "area geometry, npoints integer",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_generatepoints(area geometry, npoints integer)\\n RETURNS geometry\\n LANGUAGE c\\n PARALLEL SAFE STRICT COST 500\\nAS '$libdir/postgis-3', $function$ST\_GeneratePoints$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_generatepoints",  
    "arguments": "area geometry, npoints integer, seed integer",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_generatepoints(area geometry, npoints integer, seed integer)\\n RETURNS geometry\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 500\\nAS '$libdir/postgis-3', $function$ST\_GeneratePoints$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_geogfromtext",  
    "arguments": "text",  
    "return\_type": "geography",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_geogfromtext(text)\\n RETURNS geography\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 500\\nAS '$libdir/postgis-3', $function$geography\_from\_text$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_geogfromwkb",  
    "arguments": "bytea",  
    "return\_type": "geography",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_geogfromwkb(bytea)\\n RETURNS geography\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 50\\nAS '$libdir/postgis-3', $function$geography\_from\_binary$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_geographyfromtext",  
    "arguments": "text",  
    "return\_type": "geography",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_geographyfromtext(text)\\n RETURNS geography\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 500\\nAS '$libdir/postgis-3', $function$geography\_from\_text$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_geohash",  
    "arguments": "geog geography, maxchars integer DEFAULT 0",  
    "return\_type": "text",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_geohash(geog geography, maxchars integer DEFAULT 0)\\n RETURNS text\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 500\\nAS '$libdir/postgis-3', $function$ST\_GeoHash$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_geohash",  
    "arguments": "geom geometry, maxchars integer DEFAULT 0",  
    "return\_type": "text",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_geohash(geom geometry, maxchars integer DEFAULT 0)\\n RETURNS text\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 50\\nAS '$libdir/postgis-3', $function$ST\_GeoHash$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_geomcollfromtext",  
    "arguments": "text, integer",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_geomcollfromtext(text, integer)\\n RETURNS geometry\\n LANGUAGE sql\\n IMMUTABLE PARALLEL SAFE STRICT COST 500\\nAS $function$\\n\\tSELECT CASE\\n\\tWHEN public.geometrytype(public.ST\_GeomFromText($1, $2)) \= 'GEOMETRYCOLLECTION'\\n\\tTHEN public.ST\_GeomFromText($1,$2)\\n\\tELSE NULL END\\n\\t$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_geomcollfromtext",  
    "arguments": "text",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_geomcollfromtext(text)\\n RETURNS geometry\\n LANGUAGE sql\\n IMMUTABLE PARALLEL SAFE STRICT COST 500\\nAS $function$\\n\\tSELECT CASE\\n\\tWHEN public.geometrytype(public.ST\_GeomFromText($1)) \= 'GEOMETRYCOLLECTION'\\n\\tTHEN public.ST\_GeomFromText($1)\\n\\tELSE NULL END\\n\\t$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_geomcollfromwkb",  
    "arguments": "bytea",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_geomcollfromwkb(bytea)\\n RETURNS geometry\\n LANGUAGE sql\\n IMMUTABLE PARALLEL SAFE STRICT COST 50\\nAS $function$\\n\\tSELECT CASE\\n\\tWHEN public.geometrytype(public.ST\_GeomFromWKB($1)) \= 'GEOMETRYCOLLECTION'\\n\\tTHEN public.ST\_GeomFromWKB($1)\\n\\tELSE NULL END\\n\\t$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_geomcollfromwkb",  
    "arguments": "bytea, integer",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_geomcollfromwkb(bytea, integer)\\n RETURNS geometry\\n LANGUAGE sql\\n IMMUTABLE PARALLEL SAFE STRICT COST 50\\nAS $function$\\n\\tSELECT CASE\\n\\tWHEN public.geometrytype(public.ST\_GeomFromWKB($1, $2)) \= 'GEOMETRYCOLLECTION'\\n\\tTHEN public.ST\_GeomFromWKB($1, $2)\\n\\tELSE NULL END\\n\\t$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_geometricmedian",  
    "arguments": "g geometry, tolerance double precision DEFAULT NULL::double precision, max\_iter integer DEFAULT 10000, fail\_if\_not\_converged boolean DEFAULT false",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_geometricmedian(g geometry, tolerance double precision DEFAULT NULL::double precision, max\_iter integer DEFAULT 10000, fail\_if\_not\_converged boolean DEFAULT false)\\n RETURNS geometry\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE COST 10000\\nAS '$libdir/postgis-3', $function$ST\_GeometricMedian$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_geometryfromtext",  
    "arguments": "text, integer",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_geometryfromtext(text, integer)\\n RETURNS geometry\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 500\\nAS '$libdir/postgis-3', $function$LWGEOM\_from\_text$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_geometryfromtext",  
    "arguments": "text",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_geometryfromtext(text)\\n RETURNS geometry\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 500\\nAS '$libdir/postgis-3', $function$LWGEOM\_from\_text$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_geometryn",  
    "arguments": "geometry, integer",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_geometryn(geometry, integer)\\n RETURNS geometry\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 50\\nAS '$libdir/postgis-3', $function$LWGEOM\_geometryn\_collection$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_geometrytype",  
    "arguments": "geometry",  
    "return\_type": "text",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_geometrytype(geometry)\\n RETURNS text\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/postgis-3', $function$geometry\_geometrytype$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_geomfromewkb",  
    "arguments": "bytea",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_geomfromewkb(bytea)\\n RETURNS geometry\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 50\\nAS '$libdir/postgis-3', $function$LWGEOMFromEWKB$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_geomfromewkt",  
    "arguments": "text",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_geomfromewkt(text)\\n RETURNS geometry\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 50\\nAS '$libdir/postgis-3', $function$parse\_WKT\_lwgeom$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_geomfromgeohash",  
    "arguments": "text, integer DEFAULT NULL::integer",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_geomfromgeohash(text, integer DEFAULT NULL::integer)\\n RETURNS geometry\\n LANGUAGE sql\\n IMMUTABLE PARALLEL SAFE COST 50\\nAS $function$ SELECT CAST(public.ST\_Box2dFromGeoHash($1, $2) AS geometry); $function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_geomfromgeojson",  
    "arguments": "jsonb",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_geomfromgeojson(jsonb)\\n RETURNS geometry\\n LANGUAGE sql\\n IMMUTABLE PARALLEL SAFE STRICT COST 500\\nAS $function$SELECT public.ST\_GeomFromGeoJson($1::text)$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_geomfromgeojson",  
    "arguments": "text",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_geomfromgeojson(text)\\n RETURNS geometry\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 500\\nAS '$libdir/postgis-3', $function$geom\_from\_geojson$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_geomfromgeojson",  
    "arguments": "json",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_geomfromgeojson(json)\\n RETURNS geometry\\n LANGUAGE sql\\n IMMUTABLE PARALLEL SAFE STRICT COST 500\\nAS $function$SELECT public.ST\_GeomFromGeoJson($1::text)$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_geomfromgml",  
    "arguments": "text, integer",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_geomfromgml(text, integer)\\n RETURNS geometry\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 500\\nAS '$libdir/postgis-3', $function$geom\_from\_gml$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_geomfromgml",  
    "arguments": "text",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_geomfromgml(text)\\n RETURNS geometry\\n LANGUAGE sql\\n IMMUTABLE PARALLEL SAFE STRICT COST 500\\nAS $function$SELECT public.\_ST\_GeomFromGML($1, 0)$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_geomfromkml",  
    "arguments": "text",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_geomfromkml(text)\\n RETURNS geometry\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 500\\nAS '$libdir/postgis-3', $function$geom\_from\_kml$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_geomfrommarc21",  
    "arguments": "marc21xml text",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_geomfrommarc21(marc21xml text)\\n RETURNS geometry\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 500\\nAS '$libdir/postgis-3', $function$ST\_GeomFromMARC21$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_geomfromtext",  
    "arguments": "text",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_geomfromtext(text)\\n RETURNS geometry\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 500\\nAS '$libdir/postgis-3', $function$LWGEOM\_from\_text$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_geomfromtext",  
    "arguments": "text, integer",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_geomfromtext(text, integer)\\n RETURNS geometry\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 500\\nAS '$libdir/postgis-3', $function$LWGEOM\_from\_text$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_geomfromtwkb",  
    "arguments": "bytea",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_geomfromtwkb(bytea)\\n RETURNS geometry\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 50\\nAS '$libdir/postgis-3', $function$LWGEOMFromTWKB$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_geomfromwkb",  
    "arguments": "bytea, integer",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_geomfromwkb(bytea, integer)\\n RETURNS geometry\\n LANGUAGE sql\\n IMMUTABLE PARALLEL SAFE STRICT COST 50\\nAS $function$SELECT public.ST\_SetSRID(public.ST\_GeomFromWKB($1), $2)$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_geomfromwkb",  
    "arguments": "bytea",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_geomfromwkb(bytea)\\n RETURNS geometry\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 50\\nAS '$libdir/postgis-3', $function$LWGEOM\_from\_WKB$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_gmltosql",  
    "arguments": "text, integer",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_gmltosql(text, integer)\\n RETURNS geometry\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 500\\nAS '$libdir/postgis-3', $function$geom\_from\_gml$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_gmltosql",  
    "arguments": "text",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_gmltosql(text)\\n RETURNS geometry\\n LANGUAGE sql\\n IMMUTABLE PARALLEL SAFE STRICT COST 500\\nAS $function$SELECT public.\_ST\_GeomFromGML($1, 0)$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_hasarc",  
    "arguments": "geometry geometry",  
    "return\_type": "boolean",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_hasarc(geometry geometry)\\n RETURNS boolean\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 50\\nAS '$libdir/postgis-3', $function$LWGEOM\_has\_arc$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_hausdorffdistance",  
    "arguments": "geom1 geometry, geom2 geometry",  
    "return\_type": "double precision",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_hausdorffdistance(geom1 geometry, geom2 geometry)\\n RETURNS double precision\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 10000\\nAS '$libdir/postgis-3', $function$hausdorffdistance$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_hausdorffdistance",  
    "arguments": "geom1 geometry, geom2 geometry, double precision",  
    "return\_type": "double precision",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_hausdorffdistance(geom1 geometry, geom2 geometry, double precision)\\n RETURNS double precision\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 10000\\nAS '$libdir/postgis-3', $function$hausdorffdistancedensify$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_hexagon",  
    "arguments": "size double precision, cell\_i integer, cell\_j integer, origin geometry DEFAULT '010100000000000000000000000000000000000000'::geometry",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_hexagon(size double precision, cell\_i integer, cell\_j integer, origin geometry DEFAULT '010100000000000000000000000000000000000000'::geometry)\\n RETURNS geometry\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 50\\nAS '$libdir/postgis-3', $function$ST\_Hexagon$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_hexagongrid",  
    "arguments": "size double precision, bounds geometry, OUT geom geometry, OUT i integer, OUT j integer",  
    "return\_type": "SETOF record",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_hexagongrid(size double precision, bounds geometry, OUT geom geometry, OUT i integer, OUT j integer)\\n RETURNS SETOF record\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 500\\nAS '$libdir/postgis-3', $function$ST\_ShapeGrid$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_interiorringn",  
    "arguments": "geometry, integer",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_interiorringn(geometry, integer)\\n RETURNS geometry\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 50\\nAS '$libdir/postgis-3', $function$LWGEOM\_interiorringn\_polygon$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_interpolatepoint",  
    "arguments": "line geometry, point geometry",  
    "return\_type": "double precision",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_interpolatepoint(line geometry, point geometry)\\n RETURNS double precision\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 500\\nAS '$libdir/postgis-3', $function$ST\_InterpolatePoint$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_intersection",  
    "arguments": "text, text",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_intersection(text, text)\\n RETURNS geometry\\n LANGUAGE sql\\n IMMUTABLE PARALLEL SAFE STRICT COST 10000\\nAS $function$ SELECT public.ST\_Intersection($1::public.geometry, $2::public.geometry);  $function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_intersection",  
    "arguments": "geom1 geometry, geom2 geometry, gridsize double precision DEFAULT '-1'::integer",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_intersection(geom1 geometry, geom2 geometry, gridsize double precision DEFAULT '-1'::integer)\\n RETURNS geometry\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 10000\\nAS '$libdir/postgis-3', $function$ST\_Intersection$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_intersection",  
    "arguments": "geography, geography",  
    "return\_type": "geography",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_intersection(geography, geography)\\n RETURNS geography\\n LANGUAGE sql\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS $function$SELECT public.geography(public.ST\_Transform(public.ST\_Intersection(public.ST\_Transform(public.geometry($1), public.\_ST\_BestSRID($1, $2)), public.ST\_Transform(public.geometry($2), public.\_ST\_BestSRID($1, $2))), public.ST\_SRID($1)))$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_intersects",  
    "arguments": "text, text",  
    "return\_type": "boolean",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_intersects(text, text)\\n RETURNS boolean\\n LANGUAGE sql\\n IMMUTABLE PARALLEL SAFE\\nAS $function$ SELECT public.ST\_Intersects($1::public.geometry, $2::public.geometry);  $function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_intersects",  
    "arguments": "geom1 geometry, geom2 geometry",  
    "return\_type": "boolean",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_intersects(geom1 geometry, geom2 geometry)\\n RETURNS boolean\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 10000 SUPPORT postgis\_index\_supportfn\\nAS '$libdir/postgis-3', $function$ST\_Intersects$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_intersects",  
    "arguments": "geog1 geography, geog2 geography",  
    "return\_type": "boolean",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_intersects(geog1 geography, geog2 geography)\\n RETURNS boolean\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 10000 SUPPORT postgis\_index\_supportfn\\nAS '$libdir/postgis-3', $function$geography\_intersects$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_isclosed",  
    "arguments": "geometry",  
    "return\_type": "boolean",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_isclosed(geometry)\\n RETURNS boolean\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 50\\nAS '$libdir/postgis-3', $function$LWGEOM\_isclosed$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_iscollection",  
    "arguments": "geometry",  
    "return\_type": "boolean",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_iscollection(geometry)\\n RETURNS boolean\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/postgis-3', $function$ST\_IsCollection$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_isempty",  
    "arguments": "geometry",  
    "return\_type": "boolean",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_isempty(geometry)\\n RETURNS boolean\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 50\\nAS '$libdir/postgis-3', $function$LWGEOM\_isempty$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_ispolygonccw",  
    "arguments": "geometry",  
    "return\_type": "boolean",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_ispolygonccw(geometry)\\n RETURNS boolean\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 50\\nAS '$libdir/postgis-3', $function$ST\_IsPolygonCCW$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_ispolygoncw",  
    "arguments": "geometry",  
    "return\_type": "boolean",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_ispolygoncw(geometry)\\n RETURNS boolean\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 50\\nAS '$libdir/postgis-3', $function$ST\_IsPolygonCW$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_isring",  
    "arguments": "geometry",  
    "return\_type": "boolean",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_isring(geometry)\\n RETURNS boolean\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 500\\nAS '$libdir/postgis-3', $function$isring$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_issimple",  
    "arguments": "geometry",  
    "return\_type": "boolean",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_issimple(geometry)\\n RETURNS boolean\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 500\\nAS '$libdir/postgis-3', $function$issimple$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_isvalid",  
    "arguments": "geometry, integer",  
    "return\_type": "boolean",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_isvalid(geometry, integer)\\n RETURNS boolean\\n LANGUAGE sql\\n IMMUTABLE PARALLEL SAFE STRICT COST 10000\\nAS $function$SELECT (public.ST\_isValidDetail($1, $2)).valid$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_isvalid",  
    "arguments": "geometry",  
    "return\_type": "boolean",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_isvalid(geometry)\\n RETURNS boolean\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 10000\\nAS '$libdir/postgis-3', $function$isvalid$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_isvaliddetail",  
    "arguments": "geom geometry, flags integer DEFAULT 0",  
    "return\_type": "valid\_detail",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_isvaliddetail(geom geometry, flags integer DEFAULT 0)\\n RETURNS valid\_detail\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 10000\\nAS '$libdir/postgis-3', $function$isvaliddetail$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_isvalidreason",  
    "arguments": "geometry",  
    "return\_type": "text",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_isvalidreason(geometry)\\n RETURNS text\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 10000\\nAS '$libdir/postgis-3', $function$isvalidreason$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_isvalidreason",  
    "arguments": "geometry, integer",  
    "return\_type": "text",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_isvalidreason(geometry, integer)\\n RETURNS text\\n LANGUAGE sql\\n IMMUTABLE PARALLEL SAFE STRICT COST 10000\\nAS $function$\\n\\tSELECT CASE WHEN valid THEN 'Valid Geometry' ELSE reason END FROM (\\n\\t\\tSELECT (public.ST\_isValidDetail($1, $2)).\*\\n\\t) foo\\n\\t$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_isvalidtrajectory",  
    "arguments": "geometry",  
    "return\_type": "boolean",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_isvalidtrajectory(geometry)\\n RETURNS boolean\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 10000\\nAS '$libdir/postgis-3', $function$ST\_IsValidTrajectory$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_length",  
    "arguments": "geometry",  
    "return\_type": "double precision",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_length(geometry)\\n RETURNS double precision\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 50\\nAS '$libdir/postgis-3', $function$LWGEOM\_length2d\_linestring$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_length",  
    "arguments": "geog geography, use\_spheroid boolean DEFAULT true",  
    "return\_type": "double precision",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_length(geog geography, use\_spheroid boolean DEFAULT true)\\n RETURNS double precision\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 500\\nAS '$libdir/postgis-3', $function$geography\_length$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_length",  
    "arguments": "text",  
    "return\_type": "double precision",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_length(text)\\n RETURNS double precision\\n LANGUAGE sql\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS $function$ SELECT public.ST\_Length($1::public.geometry);  $function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_length2d",  
    "arguments": "geometry",  
    "return\_type": "double precision",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_length2d(geometry)\\n RETURNS double precision\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 50\\nAS '$libdir/postgis-3', $function$LWGEOM\_length2d\_linestring$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_length2dspheroid",  
    "arguments": "geometry, spheroid",  
    "return\_type": "double precision",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_length2dspheroid(geometry, spheroid)\\n RETURNS double precision\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 500\\nAS '$libdir/postgis-3', $function$LWGEOM\_length2d\_ellipsoid$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_lengthspheroid",  
    "arguments": "geometry, spheroid",  
    "return\_type": "double precision",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_lengthspheroid(geometry, spheroid)\\n RETURNS double precision\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 500\\nAS '$libdir/postgis-3', $function$LWGEOM\_length\_ellipsoid\_linestring$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_letters",  
    "arguments": "letters text, font json DEFAULT NULL::json",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_letters(letters text, font json DEFAULT NULL::json)\\n RETURNS geometry\\n LANGUAGE plpgsql\\n IMMUTABLE PARALLEL SAFE COST 500\\n SET standard\_conforming\_strings TO 'on'\\nAS $function$\\nDECLARE\\n  letterarray text\[\];\\n  letter text;\\n  geom geometry;\\n  prevgeom geometry \= NULL;\\n  adjustment float8 \= 0.0;\\n  position float8 \= 0.0;\\n  text\_height float8 \= 100.0;\\n  width float8;\\n  m\_width float8;\\n  spacing float8;\\n  dist float8;\\n  wordarr geometry\[\];\\n  wordgeom geometry;\\n  \-- geometry has been run through replace(encode(st\_astwkb(geom),'base64'), E'\\\\n', '')\\n  font\_default\_height float8 \= 1000.0;\\n  font\_default json \= '{\\n  \\"\!\\":\\"BgACAQhUrgsTFOQCABQAExELiwi5AgAJiggBYQmJCgAOAg4CDAIOBAoEDAYKBgoGCggICAgICAgGCgYKBgoGCgQMBAoECgQMAgoADAIKAAoADAEKAAwBCgMKAQwDCgMKAwoFCAUKBwgHBgcIBwYJBgkECwYJBAsCDQILAg0CDQANAQ0BCwELAwsDCwUJBQkFCQcHBwcHBwcFCQUJBQkFCQMLAwkDCQMLAQkACwEJAAkACwIJAAsCCQQJAgsECQQJBAkGBwYJCAcIBQgHCAUKBQoDDAUKAQwDDgEMAQ4BDg==\\",\\n  \\"&\\":\\"BgABAskBygP+BowEAACZAmcAANsCAw0FDwUNBQ0FDQcLBw0HCwcLCQsJCwkLCQkJCwsJCwkLCQ0HCwcNBw8HDQUPBQ8DDwMRAw8DEQERAREBEQERABcAFQIXAhUCEwQVBBMGEwYTBhEIEQgPChEKDwoPDA0MDQwNDgsOCRAJEAkQBxAHEgUSBRQFFAMUAxQBFgEWARgAigEAFAISABICEgQQAhAEEAQQBg4GEAoOCg4MDg4ODgwSDgsMCwoJDAcMBwwFDgUMAw4DDgEOARABDgEQARIBEAASAHgAIAQeBB4GHAgaChoMGA4WDhYQFBISEhISDhQQFAwWDBYKFgoYBhgIGAQYBBgCGgAaABgBGAMYAxYHFgUWCRYJFAsUCxIPEg0SERARDhMOFQwVDBcIGQYbBhsCHQIfAR+dAgAADAAKAQoBCgEIAwgFBgUGBQYHBAUEBwQHAgcCBwIHAAcABwAHAQcBBwMHAwUDBwUFBQUHBQUBBwMJAQkBCQAJAJcBAAUCBQAFAgUEBQIDBAUEAwQDBgMEAQYDBgEGAAgBBgAKSeECAJ8BFi84HUQDQCAAmAKNAQAvExMx\\",\\n  \\"\\\\\\"\\":\\"BgACAQUmwguEAgAAkwSDAgAAlAQBBfACAIACAACTBP8BAACUBA==\\",\\n  \\"''\\":\\"BgABAQUmwguEAgAAkwSDAgAAlAQ=\\",\\n  \\"(\\":\\"BgABAUOQBNwLDScNKw0rCysLLwsxCTEJMwc1BzcHNwM7AzsDPwE/AEEANwI1AjMEMwIzBjEGLwYvCC0ILQgrCCkKKQonCicMJbkCAAkqCSoHLAksBywFLgcuBS4FMAMwAzADMgEwATQBMgA0ADwCOgI6BDoEOAY4BjYINgg2CjQKMgoyCjIMMAwwDi7AAgA=\\",\\n  \\")\\":\\"BgABAUMQ3Au6AgAOLQwvDC8KMQoxCjEKMwg1CDUGNQY3BDcEOQI5AjkAOwAzATEBMQExAy8DLwMvBS8FLQctBS0HKwktBykJKwkpswIADCYKKAooCioIKggsCC4ILgYwBjAGMgQ0AjQCNAI2ADgAQgFAAz4DPAM8BzgHOAc2CTQJMgsyCzALLg0sDSoNKg==\\",\\n  \\"+\\":\\"BgABAQ3IBOwGALcBuAEAANUBtwEAALcB0wEAALgBtwEAANYBuAEAALgB1AEA\\",\\n  \\"/\\":\\"BgABAQVCAoIDwAuyAgCFA78LrQIA\\",\\n  \\"4\\":\\"BgABAhDkBr4EkgEAEREApwJ/AADxARIR5QIAEhIA9AHdAwAA7ALIA9AG6gIAEREA8QYFqwIAAIIDwwH/AgABxAEA\\",\\n  \\"v\\":\\"BgABASDmA5AEPu4CROwBExb6AgAZFdMC0wgUFaECABIU0wLWCBcW+AIAExVE6wEEFQQXBBUEFwQVBBUEFwQVBBUEFwQVBBUEFwQXBBUEFwYA\\",\\n  \\",\\":\\"BgABAWMYpAEADgIOAgwCDgQMBAoGDAYKBgoICAgICAgICAoGCgYKBAoEDAQKBAoCDAIKAgwCCgAKAAwACgEMAQoBCgMMAwoDCgUKBQgFCgUIBwYJCAcGCQYJBAsGCQQLAg0CCwINAg0AAwABAAMAAwADAQMAAwADAAMBBQAFAQcBBwEHAwcBCQMJAQsDCwMLAw0FDQMNBQ8FDwURBxMFEwkTBxcJFwkXswEAIMgBCQYJBgkGBwYJCAcIBQgHCgUKBQoFDAEMAwwBDgEOABA=\\",\\n  \\"-\\":\\"BgABAQUq0AMArALEBAAAqwLDBAA=\\",\\n  \\".\\":\\"BgABAWFOrAEADgIOAg4CDgQMBAoGDAYKBgoICAgKCAgIBgoGCgYKBgoEDAQKBAwECgIMAAwCDAAMAAwBCgAMAQoDDAMKAwoDCgUKBQgFCgUIBwgJBgcICQYJBgsGCQQLAg0CDQINAA0ADQENAQ0BCwMNAwkFCwUJBQkHBwcJBwUHBwkFCQUJBQkDCwMJAwsDCQELAAsBCwALAAsCCQALAgkECwQJBAkECQYJBgcGBwgJBgcKBQgHCgUKBQwFCgEOAwwBDgEOAA4=\\",\\n  \\"0\\":\\"BgABAoMB+APaCxwAHAEaARoDFgMYBRYFFAcUBxIJEgkQCRALEAsOCwwNDA0MDQoPCg0IDwgPBhEGDwYRBA8EEQIRAhMCEQITABMA4QUAEQETAREBEQMRAxEFEQURBREHDwkPBw8JDwsNCw0LDQ0NDQsNCw8JEQkRCREJEwcTBxUFFQUVAxUDFwEXARkAGQAZAhcCFwQXBBUGEwYTCBMIEQoRCg8KDwoPDA0MDQ4NDgsOCQ4JEAkQBxAHEAUSBRIDEgMSAxIDEgESARQAEgDiBQASAhQCEgISBBIEEgYSBhIGEggQChAIEAoQDBAMDgwODg4ODA4MEgwQChIKEggUCBQIFgYWBBYGGAQYAhgCGgILZIcDHTZBEkMRHTUA4QUeOUITRBIePADiBQ==\\",\\n  \\"2\\":\\"BgABAWpUwALUA44GAAoBCAEKAQgDBgMGBQYFBgUEBwQFBAUCBwIHAgUABwAHAAUBBwMFAQcFBQMHBQUHBQcFBwMJAwkBCQELAQsAC68CAAAUAhIAFAISBBQCEgQUBBIEEgYUCBIGEAgSChAKEAoQDBAMDg4ODgwQDBIMEgoSChQIFggWCBgGGAQaAhwCHAIWABQBFgEUARQDFAMSAxQFEgUSBxIHEAkQCRALDgsODQ4NDA8KDwwRCBMKEwgTBhUGFwQXBBcEGwAbABsAHQEftwPJBdIDAACpAhIPzwYAFBIArgI=\\",\\n  \\"1\\":\\"BgABARCsBLALAJ0LEhERADcA2QEANwATABQSAOYIpwEAALgCERKEBAASABER\\",\\n  \\"3\\":\\"BgABAZ0B/gbEC/sB0QQOAwwBDAMMAwwFCgMKBQoFCgUIBwoFCAcICQgJBgkICQYLCAsECwYLBA0GDwINBA8CDwQRAhECEQITABUCFQAVAH0AEQETAREBEQETAxEDEQURBREFDwcRBw8JDwkNCQ8LDQsNDQsNCw0LDwsPCREJEQcRBxMFFQUVBRUDFwEXARkAGQAZAhkCFwQVBBUEEwYTCBEIEQgRCg0MDwoNDA0OCw4LDgkQCRAHEAkQBRAFEgUSAxIDFAMSAxYBFAEWARYAFqQCAAALAgkCCQQHAgcGBwYHBgUIBQYDCAMIAwYDCAEIAQgACAAIAAgCCAIIAgYCCAQIBAgGBgYEBgQIBAoCCgAKAAwAvAEABgEIAAYBBgMGAwQDBgMEBQQDBAUCBQQFAgUABwIFAJkBAACmAaIB3ALbAgAREQDmAhIRggYA\\",\\n  \\"5\\":\\"BgABAaAB0APgBxIAFAESABIBEgMSARADEgMQAxIFEAcOBRAHDgkOCQ4JDgsMCwwLCgsKDQoPCA0IDwgPBhEEEwYTAhMEFwIXABcAiQIAEwETABEBEQMTAxEDDwMRBQ8FDwUPBw8JDQcNCQ0LDQsLCwsNCw0JDwkPCREHEQcTBxMFEwMVAxcDGQEZARkAFwAVAhUCFQQTBBMGEwYRCBEIDwoPCg8KDQwNDA0MCw4LDgkOCRAJEAcOBxAHEgUQBRIDEAMSAxIBEgEUARIAFLgCAAAFAgUABQIFBAUCBQQDBAUEAwYDBgMIAwgBCAEIAQoACAAIAgYACAQGAgQEBgQEBAQGBAQCBgIGAgYCBgIIAAYA4AEABgEIAAYBBgMGAQQDBgMEAwQFBAMCBQQFAgUABwIFAPkBAG+OAQCCBRESAgAAAuYFABMRAK8CjQMAAJ8BNgA=\\",\\n  \\"7\\":\\"BgABAQrQBsILhQOvCxQR7wIAEhK+AvYIiwMAAKgCERKwBgA=\\",\\n  \\"6\\":\\"BgABAsYBnAOqBxgGFgYYBBYEFgIWABQBFgEUAxQDFAUUBRIFEAcSCRAJEAkOCw4NDgsMDQoPCg8KDwgRCBEGEQYRBBMCEwITAhUAkwIBAAERAREBEQEPAxEFEQMPBREFDwcPBw8HDwkNCQ0LDQsNCwsNCw0LDQkPCQ8JDwcRBxEHEwUTAxMFFQEXAxcBGQAVABUCEwIVBBMEEQYTBhEIEQgPChEKDQoPDA0MDQwNDgsOCxALDgkQCRAHEgcQBxIFEgUSBRIBFAMSARIBFAASAOIFABACEgIQAhIEEAQQBhIGEAYQCBAKEAgOChAMDgwMDA4ODA4MDgwODBAKEAoQChIIEggSBhQGFgYUAhYCGAIYABoAGAEYARYBFgMUBRQFEgUSBxAHEAcQCQ4LDgkMCwwNDA0KDQgPCg0GEQgPBhEEEQQRBBMEEwITAhMCFQIVABWrAgAACgEIAQoBCAEGAwYDBgUGBQQFBAUEBQQFAgUABwIFAAUABwEFAAUBBQMFAwUDBQMFBQMFAwUBBQEHAQkBBwAJAJcBDUbpBDASFi4A4AETLC8SBQAvERUrAN8BFC0yEQQA\\",\\n  \\"8\\":\\"BgABA9gB6gPYCxYAFAEUARYBEgMUBRQFEgUSBxIHEAcSCQ4JEAkOCw4LDgsMDQwNCg0KDQoPCg8IDwgPBhEGEQQPBBMCEQIRABMAQwAxAA8BEQEPAREDDwMRAw8FEQUPBxEJDwkPCQ8NDw0PDQ8IBwYHCAcGBwgHBgkGBwYJBgcECQYJBAkGCQQJBAsECwQLBA0CCwINAg8CDwIPAA8AaQATAREBEwERAxEFEQURBREHEQcPBw8JDwkPCw8LDQsNDQ0LCw0LDwsNCQ8JDwcPBw8HEQURAxEFEQMRARMBEwFDABEAEwIRAhEEEQQRBg8GEQgPCA8KDwoPCg0MDQwNDAsOCw4LDgkQCRAJDgkQBxIHEAcSBRADEgMUAxIBFAEUABQAagAOAhAADgIOAg4EDAIOBAwEDAQMBgwECgYMBAoGCAYKBgoGCggKBgoICgYICAoICA0MCwwLDgsOCRAHEAcQBxIFEgUSAxIDEgMSARABEgASADIARAASAhICEgQSAhIGEAYSBhAIEAgQCBAKDgoODA4MDgwMDgwODA4KEAwQCBIKEggSCBQIFAYUBBQEFgQWAhYCGAANT78EFis0EwYANBIYLgC0ARcsMRQFADERGS0AswELogHtAhcuNxA3DRkvALMBGjE6ETYSGDIAtAE=\\",\\n  \\"9\\":\\"BgABAsYBpASeBBcFFQUXAxUDFQEVABMCFQITBBMEEwYRBhMGDwgRCg8KDwoNDA0OCwwNDgkQCRAJEAcSBxIFEgUSAxQBFAEUARYAlAICAAISAhICEgQSAhAGEgQQBhIGEAgSCA4IEAoOChAMDAwODAwODA4MEAoOChAKEAgSCBIIFAYUBBQGFgIYBBgCGgAWABYBFAEWAxQDEgUUBRIHEgcQCRIJEAkOCw4LDgsODQwNDA0MDwoPCg8IDwgRCBEGEQYRBhEEEQITAhECEwARAOEFAA8BEQEPAREDDwMPBREFDwUPBw8JDwcNCQ8LDQsLCw0NCw0LDQsNCw8JEQkPCREHEQcTBRMFEwUTARUBFQEXABkAFwIXAhcCFQQTBhMGEQYRCA8IDwgNCg8MCwoLDAsOCQ4JDgkQBxAHEAUQBRIFEgMSAxQDFAEUAxQAFgEWABamAgAACwIJAgkCCQIHBAcEBwYFBgUGAwYDBgMGAQgBBgEIAAgABgIIAgYCBgQGBAYEBgYGBgQIBAgECAIKAgoCCgAMAJgBDUXqBC8RFS0A3wEUKzARBgAwEhYsAOABEy4xEgMA\\",\\n  \\":\\":\\"BgACAWE0rAEADgIOAg4CDgQMBAoGDAYKBgoICAgKCAgIBgoGCgYKBgoEDAQKBAwECgIMAAwCDAAMAAwBCgAMAQoDDAMKAwoDCgUKBQgFCgUIBwgJBgcICQYJBgsGCQQLAg0CDQINAA0ADQENAQ0BCwMNAwkFCwUJBQkHBwcJBwUHBwkFCQUJBQkDCwMJAwsDCQELAAsBCwALAAsCCQALAgkECwQJBAkECQYJBgcGBwgJBgcKBQgHCgUKBQwFCgEOAwwBDgEOAA4BYQDqBAAOAg4CDgIOBAwECgYMBgoGCggICAoICAgGCgYKBgoGCgQMBAoEDAQKAgwADAIMAAwADAEKAAwBCgMMAwoDCgMKBQoFCAUKBQgHCAkGBwgJBgkGCwYJBAsCDQINAg0ADQANAQ0BDQELAw0DCQULBQkFCQcHBwkHBQcHCQUJBQkFCQMLAwkDCwEJAwsACwELAAsACwIJAAsECQILBAkECQQJBgkGBwYHCAkGBwoFCAcKBQoFDAUKAQ4DDAEOAQ4ADg==\\",\\n  \\"x\\":\\"BgABARHmAoAJMIMBNLUBNrYBMIQB1AIA9QG/BI4CvwTVAgA5hgFBwAFFxwE1fdUCAI4CwATzAcAE1AIA\\",\\n  \\";\\":\\"BgACAWEslgYADgIOAg4CDgQMBAoGDAYKBgoICAgKCAgIBgoGCgYKBgoEDAQKBAwECgIMAAwCDAAMAAwBCgAMAQoDDAMKAwoDCgUKBQgFCgUIBwgJBgcICQYJBgsGCQQLAg0CDQINAA0ADQENAQ0BCwMNAwkFCwUJBQkHBwcJBwUHBwkFCQUJBQkDCwMJAwsBCQMLAAsBCwALAAsCCQALBAkCCwQJBAkECQYJBgcGBwgJBgcKBQgHCgUKBQwFCgEOAwwBDgEOAA4BYwjxBAAOAg4CDAIOBAwECgYMBgoGCggICAgICAgICgYKBgoECgQMBAoECgIMAgoCDAIKAAoADAAKAQwBCgEKAwwDCgMKBQoFCAUKBQgHBgkIBwYJBgkECwYJBAsCDQILAg0CDQADAAEAAwADAAMBAwADAAMAAwEFAAUBBwEHAQcDBwEJAwkBCwMLAwsDDQUNAw0FDwUPBREHEwUTCRMHFwkXCRezAQAgyAEJBgkGCQYHBgkIBwgFCAcKBQoFCgUMAQwDDAEOAQ4AEA==\\",\\n  \\"=\\":\\"BgACAQUawAUA5gHEBAAA5QHDBAABBQC5AgDsAcQEAADrAcMEAA==\\",\\n  \\"B\\":\\"BgABA2e2BMQLFgAUARQBFAEUAxIDEgUSBRIFEAcQBxAJDgkOCQ4LDgsMCwwNDA0KDQgNCg0IDwYPBg8GDwQRBBEEEQIRAhMAEwAHAAkABwEHAAkBCQAHAQkBCQEHAQkBCQMJAwcDCQMJAwkFBwUJAwkHCQUHBQkHCQcJBwcHBwkHBwcJBwsHCQUQBQ4FDgcOCQ4JDAkMCwoNCg0IDwgRBhMEFQQXAhcCGwDJAQEvAysFJwklDSMPHREbFRkXFRsTHw8fCyUJJwcrAy0B6wMAEhIAoAsREuYDAAiRAYEElgEAKioSSA1EOR6JAQAA0wEJkAGPBSwSEiwAzAETKikSjwEAAMUCkAEA\\",\\n  \\"A\\":\\"BgABAg/KBfIBqQIAN98BEhHzAgAWEuwCngsREvwCABMR8gKdCxIR8QIAFBI54AEFlwGCBk3TA6ABAE3UAwMA\\",\\n  \\"?\\":\\"BgACAe4BsgaYCAAZABkBFwEXBRUDEwUTBxEHEQcPCQ8JDQkNCQ0LCwsLCwsLCQsJCwcNBwsHDQcLBQsFDQULAwkFCwMLAwkDCQMBAAABAQABAAEBAQABAAEAAQABAAABAQAAAQEAEwcBAQABAAMBAwADAAUABQAFAAcABwAFAAcABwAFAgcABQAHAAUAW7cCAABcABgBFgAUAhQAFAISAhACEAIQBA4EDgQMBgwGDAYMBgoICgYKCAgKCggICAgKBgoICgYMCAwGDAgOBg4GEAYQBgIAAgIEAAICBAACAgQCBAIKBAoGCAQKBggIBgYICAYIBggGCgQIBAoECAQKAggCCgIKAAgACgAKAAgBCAEKAwgDCAMIAwgFBgMIBQYHBAUGBQQFBAcCBQQHAgcCCQIHAgkCBwAJAgkACQAJAAkBCQAJAQsACQELAQsDCwELAwsDCwMLAwsDCwULAwsFCwMLBV2YAgYECAQKBAwGDAQMBhAIEAYSBhIIEgYUBhIEFgYUBBYEFgQWAhgCFgIYABYAGAAYARgBGAMWBRYHFgcWCRYLFA0IBQYDCAUIBwYFCAcGBwgHBgcICQYJCAkGCQYJCAsGCwYLBgsGDQYNBA0GDQQNBA8EDwQPAg8EEQIRAhEAEQITAWGpBesGAA4CDgIOAg4EDAQKBgwGCgYKCAgICggICAYKBgoGCgYKBAwECgQMBAoCDAAMAgwADAAMAQoADAEKAwwDCgMKAwoFCgUIBQoFCAcICQYHCAkGCQYLBgkECwINAg0CDQANAA0BDQENAQsDDQMJBQsFCQUJBwcHCQcFBwcJBQkFCQUJAwsDCQMLAwkBCwALAQsACwALAgkACwIJBAsECQQJBAkGCQYHBgcICQYHCgUIBwoFCgUMBQoBDgMMAQ4BDgAO\\",\\n  \\"C\\":\\"BgABAWmmA4ADAAUCBQAFAgUEBQIDBAUEAwQDBgMEAQYDBgEGAAgBBgDWAgAAwQLVAgATABMCEQITBBEEEQQRBhEIEQgPCA8KDwoNCg0MDQwNDAsOCw4LDgkOCxAHEAkQBxIHEgUSBRIDEgEUARIBFAAUAMIFABQCFAISBBQEEgQSBhIIEggSCBAKEAoQCg4MDgwODA4ODA4MDgwQDA4KEggQChIIEggSBhIGFAQSAhQCEgIUAMYCAADBAsUCAAUABwEFAAUBBQMDAQUDAwMDAwMFAQMDBQEFAAUBBwAFAMEF\\",\\n  \\"L\\":\\"BgABAQmcBhISEdkFABIQALQLwgIAAIEJ9AIAAK8C\\",\\n  \\"D\\":\\"BgABAkeyBMQLFAAUARIBFAESAxIDEgMSBRIFEAcQBxAHDgkOCQ4LDgsMCwwNDA0KDwoPCg8IDwgRCBEGEwQTBBMEEwIVAhUAFwDBBQAXARcBFwMTAxUDEwUTBxEHEQcPCQ8JDwkNCw0LCwsLDQsNCQ0JDQcPBw8HDwcRBREFEQMRAxEDEwERARMBEwDfAwASEgCgCxES4AMACT6BAxEuKxKLAQAAvwaMAQAsEhIsAMIF\\",\\n  \\"F\\":\\"BgABARGABoIJ2QIAAIECsgIAEhIA4QIRErECAACvBBIR5QIAEhIAsgucBQASEgDlAhES\\",\\n  \\"E\\":\\"BgABARRkxAuWBQAQEgDlAhES0QIAAP0BtgIAEhIA5wIRFLUCAAD/AfACABISAOUCERLDBQASEgCyCw==\\",\\n  \\"G\\":\\"BgABAZsBjgeIAgMNBQ8FDQUNBQ0HCwcNBwsHCwkLCQsJCwsJCwsLCQsJDQkLBw0HDwcNBw8FDwUPAw8DEQMPAxEBEQERARMBEQAXABUCFwIVAhMEFQQTBhMGEwYRCBEIDwoRCg8KDwwNDA0MDQ4LDgkQCRAJEAcQBxIFEgUUBRQDFAMUARYBFgEYAMoFABQCFAASBBQCEgQSBBIEEgYSBhAGEAgQCBAKDgoOCg4MDgwMDgwOChAKEAoSCBIIFAgUBhQEGAYWAhgEGAIaAOoCAAC3AukCAAcABwEFAQUBBQMFAwMFAwUDBQEFAQcBBQEFAQUABwAFAMUFAAUCBwIFAgUCBQQFBAMGBQYDBgUGAwgDBgMIAQgDCAEIAQoBCAEIAAgACgAIAAgCCAIIAggECgQGBAgECAYIBgC6AnEAAJwCmAMAAJcF\\",\\n  \\"H\\":\\"BgABARbSB7ILAQAAnwsSEeUCABISAOAE5QEAAN8EEhHlAgASEgCiCxEQ5gIAEREA/QPmAQAAgAQPEOYCABER\\",\\n  \\"I\\":\\"BgABAQmuA7ILAJ8LFBHtAgAUEgCgCxMS7gIAExE=\\",\\n  \\"J\\":\\"BgABAWuqB7ILALEIABEBEwERAREDEwMRAxEFEQURBw8HEQcPCQ0LDwsNCw0NDQ0LDwsPCxEJEQkTCRMJFQcVBxcFFwMZAxsBGwEbAB8AHQIbAhsEGQYXBhcGFQgTCBMKEwoRDA8KDwwNDA0OCw4LDgkQCRAJEAcQBRIFEgUSAxQDEgESARIBFAESABIAgAEREtoCABERAn8ACQIHBAcEBwYHBgUIBQoDCgMKAwoDDAEKAQwBCgEMAAwACgAMAgoCDAIKBAoECgYKBggGBgYGCAQGBAgCCgAIALIIERLmAgAREQ==\\",\\n  \\"M\\":\\"BgACAQRm1gsUABMAAAABE5wIAQDBCxIR5QIAEhIA6gIK5gLVAe0B1wHuAQztAgDhAhIR5QIAEhIAxAsUAPoDtwT4A7YEFgA=\\",\\n  \\"K\\":\\"BgABAVXMCRoLBQsDCQMLAwsDCwMLAwsBCwELAQsBCwELAQ0ACwELAAsADQALAg0ACwILAA0CCwILAgsCDQQLBAsECwYNBAsGCwYLCAsGCwgJCgsICQoJCgkMCQwJDAkOCRALEAkQCRKZAdICUQAAiwQSEecCABQSAKALExLoAgAREQC3BEIA+AG4BAEAERKCAwAREdkCzQXGAYUDCA0KDQgJCgkMBwoFDAUMAQwBDgAMAg4CDAQOBAwGDghmlQI=\\",\\n  \\"O\\":\\"BgABAoMBsATaCxwAHAEaARoDGgMYBRYFFgcWBxQJEgkSCRILEAsODQ4NDg0MDwoNDA8KDwgPCBEIDwYRBg8GEQQRAhMCEQITABMA0QUAEQETAREBEQMTBREFEQURBxEHDwcRCQ8LDQsPCw0NDQ0NDwsPCw8LEQkTCRMJEwkVBxUHFwUXAxkDGQEbARsAGwAZAhkCGQQXBhcGFQYVCBUIEwoRChEMEQoRDA8MDQ4NDg0OCxAJEAsQCRAHEgcSBxIFFAMSAxIDEgEUARIAEgDSBQASAhQCEgISBBIEEgYSBhIIEggQCBAKEgwODBAMEA4ODg4QDhIMEAwSChQKFAgUCBYIFgYYBBoGGgQcAh4CHgILggGLAylCWxZbFSlBANEFKklcGVwYKkwA0gU=\\",\\n  \\"N\\":\\"BgABAQ+YA/oEAOUEEhHVAgASEgC+CxQAwATnBQDIBRMS2AIAExEAzQsRAL8ElgU=\\",\\n  \\"P\\":\\"BgABAkqoB5AGABcBFQEVAxMDEwMTBREHEQcRBw8JDwkNCQ0LDQsNCwsNCw0JDQkNCQ8HDwcPBxEFEQURAxEDEQMTAREBEwETAH8AAIMDEhHlAgASEgCgCxES1AMAFAAUARIAFAESAxIDEgMSAxIFEAUQBRAHDgkOCQ4JDgsMCwwNDA0KDQoNCg8IDwgRCBEGEwQTBBUEFQIXAhkAGQCzAgnBAsoCESwrEn8AANUDgAEALBISLgDYAg==\\",\\n  \\"R\\":\\"BgABAj9msgsREvYDABQAFAESARQBEgESAxIDEgUSBRAFEAcQBw4JDgkOCQ4LDAsMDQwLCg0KDwoNCA8IDwgPBhEEEwYTAhMEFQIXABcAowIAEwEVARMDEwMTBRMFEQcTBxELEQsRDQ8PDREPEQ0VC8QB/QMSEfkCABQSiQGyA3EAALEDFBHnAgASEgCgCwnCAscFogEALhISLACqAhEsLRKhAQAApQM=\\",\\n  \\"Q\\":\\"BgABA4YBvAniAbkB8wGZAYABBQUFAwUFBQUHBQUDBwUFBQcFBQMHBQcDBwUJAwcDCQMJAwkDCQMJAQsDCwMLAQsDCwENAw0BDQEPAA8BDwAPABsAGwIZAhcEGQQXBBUGFQgVCBMIEQoTChEKDwwPDA8ODQ4NDgsQCxAJEAkQBxIHEgUSBRQFFAMUARQDFAEWABYAxgUAEgIUAhICEgQSBBIGEgYSCBIIEAgQChIMDgwQDBAODg4OEA4SDBAMEgoUChQIFAgWCBYGGAQaBhoEHAIeAh4CHAAcARoBGgMaAxgFFgUWBxYHFAkSCRIJEgsQCw4NDg0ODQwPCg0MDwoPCA8IEQgPBhEGDwYRBBECEwIRAhMAEwC7BdgBrwEImQSyAwC6AylAWxZbFSk/AP0BjAK7AQeLAoMCGEc4J0wHVBbvAaYBAEM=\\",\\n  \\"S\\":\\"BgABAYMC8gOEBxIFEgUQBxIFEgcSBxIJEgcSCRIJEAkQCRALEAsOCw4NDg0MDQ4PDA0KEQoPChEKEQgRCBMGFQQTBBcCFQAXABkBEwARAREBEQMPAQ8DDwMPAw0DDQUNAw0FCwULBwsFCwUJBwsFCQcHBQkHCQUHBwcHBwUHBwUFBQcHBwUHAwcFEQsRCxMJEwkTBxMFEwUVBRUDFQMVARMBFwEVABUAFQIVAhUCFQQVBBUEEwYVBhMIEwgTCBMIEwgRCBMKEQgRCmK6AgwFDgUMAw4FEAUOBRAFEAUQBRAFEAMSAw4DEAMQAxABEAEOAQ4AEAIMAg4CDgQMBAwGCggKCAoKBgwGDgYQBBACCgAMAAoBCAMKBQgFCAcIBwgJCAsGCQgLCA0IDQgNCA8IDQgPCA8IDwgPChEIDwgPCBEKDwoPDBEMDwwPDg8ODw4NEA0QCxALEgsSCRIHEgcUBRQFGAUYAxgBGgEcAR4CJAYkBiAIIAweDBwQHBAYEhgUFBYUFhQWEBoQGg4aDBwKHAoeBh4GIAQgAiACIgEiASIFIgUiBSAJIgkgCyINZ58CBwQJAgkECwQLAgsECwINBA0CDQQNAg0CDQALAg0ADQANAAsBCwELAQsDCwULBQkFCQcHBwcJBwkFCwMLAw0BDQENAAsCCwQLBAkGCQgJCAkKBwoJCgcMBQoHDAcMBQwF\\",\\n  \\"V\\":\\"BgABARG2BM4DXrYEbKwDERL0AgAVEesCnQsSEfsCABQS8QKeCxES8gIAExFuqwNgtQQEAA==\\",\\n  \\"T\\":\\"BgABAQskxAv0BgAAtQKVAgAA+wgSEeUCABISAPwImwIAALYC\\",\\n  \\"U\\":\\"BgABAW76B7ALAKMIABcBFwMXARUFFQUTBxMHEwkRCREJEQsPDQ0LDw0NDwsPCw8LEQkPCRMJEQcTBxMFEwUVBRUDEwMXARUBFQEXABUAEwIVAhMCFQQTBBUEEwYTBhMIEwgRChEIEQwRDA8MDw4PDg0OCxANEAsSCRIJEgcUBxQHFAMWBRYBGAEYARgApggBAREU9AIAExMAAgClCAALAgkECQQHBAcIBwgHCAUKBQoDCgMKAwwBCgEMAQwADAAMAgoCDAIKAgoECgQKBggGCAYICAYKBAgCCgIMAgwApggAARMU9AIAExM=\\",\\n  \\"X\\":\\"BgABARmsCBISEYkDABQSS54BWYICXYkCRZUBEhGJAwAUEtYCzgXVAtIFExKIAwATEVClAVj3AVb0AVKqAREShgMAERHXAtEF2ALNBQ==\\",\\n  \\"W\\":\\"BgABARuODcQLERHpAp8LFBHlAgASEnW8A2+7AxIR6wIAFBKNA6ALERKSAwATEdQB7wZigARZ8AIREugCAA8RaKsDYsMDXsoDaqYDExLqAgA=\\",\\n  \\"Y\\":\\"BgABARK4BcQLhgMAERHnAvMGAKsEEhHnAgAUEgCsBOkC9AYREoYDABERWOEBUJsCUqICVtwBERI=\\",\\n  \\"Z\\":\\"BgABAQmAB8QLnwOBCaADAADBAusGAMgDggmhAwAAwgLGBgA=\\",\\n  \\"\`\\":\\"BgABAQfqAd4JkQHmAQAOlgJCiAGpAgALiwIA\\",\\n  \\"c\\":\\"BgABAW3UA84GBQAFAQUABQEFAwMBBQMDAwMDAwUBAwMFAQUABQEHAAUAnQMABQIFAAUCBQQFAgMEBQQDBAMGAwQBBgMGAQYABgEGAPABABoMAMsCGw7tAQATABMCEwARAhMEEQIPBBEEDwQPBg8IDwYNCA0KDQoNCgsMCwwLDAkOCRAHDgcQBxIFEgUUBRQDFAEWAxgBGAAYAKQDABQCFAISBBQCEgYSBhAGEggQCBAIEAoQCg4MDAwODAwODAwKDgwQCg4IEAgQCBAIEAYSBhIGEgQSAhQCFAIUAOABABwOAM0CGQzbAQA=\\",\\n  \\"a\\":\\"BgABApoB8AYCxwF+BwkHCQcJCQkHBwkHBwcJBQkFBwUJBQkFCQMHBQkDCQMJAwcDCQEHAQkBBwEJAQcABwAHAQcABQAHAAUBBQAFABMAEwITAhEEEwQPBBEGDwgPCA0IDwoLCg0KCwwLDAsMCQ4JDgkOBw4HEAcQBRAFEAUSAxADEgESAxIBFAESABQAFAISAhQCEgQSBBIEEgYSBhIIEAgQChAIDgwODA4MDg4MDgwODBAMEAoSCBIKEggUCBQGFgYWBBgEGAIaAhoAcgAADgEMAQoBCgEIAwgDBgUEBQQFBAcCBwIHAgkCCQAJAKsCABcPAMwCHAvCAgAUABYBEgAUARIDFAMQAxIDEAUSBQ4FEAcOCRAJDAkOCwwLDA0MCwoNCg8IDwgPCA8GEQYRBhMEEwIXAhUCFwAZAIMGFwAKmQLqA38ATxchQwgnGiMwD1AMUDYAdg==\\",\\n  \\"b\\":\\"BgABAkqmBIIJGAAYARYBFgEUAxQDEgUSBRIFEAcQCQ4HDgkOCw4LDAsMDQoNCg0KDQgPBg8GDwYRBBEEEQQTBBECEwIVAhMAFQD/AgAZARcBFwEXAxUDEwUTBREFEQcPBw8JDwkNCQ0LDQsLCwsNCQ0JDQcPBw8HDwURAxEDEQMTAxMBEwMVARUAFQHPAwAUEgCWCxEY5gIAERkAowKCAQAJOvECESwrEn8AAJsEgAEALBISLgCeAw==\\",\\n  \\"d\\":\\"BgABAkryBgDLAXAREQ8NEQ0PDREJDwkRBw8FDwURAw8DDwERAw8BEQEPACMCHwQfCB0MGw4bEhcUFxgVGhEeDSANJAkmBSgDKgEuAIADABYCFAIUAhQCFAQUBBIGEgYSBhAIEAgQCBAKDgoODAwMDAwMDgoOCg4KEAgQCBIGEgYSBhQEFgQWBBYCGAIYAHwAAKQCERrmAgARFwCnCxcADOsCugJGMgDmA3sAKxERLQCfAwolHBUmBSQKBAA=\\",\\n  \\"e\\":\\"BgABAqMBigP+AgAJAgkCCQQHBAcGBwYFCAUIBQgDCgMIAQoDCAEKAQoACgAKAAoCCAIKAggECgQIBAgGCAYGBgQIBAoECAIKAAyiAgAAGQEXARcBFwMVBRMFEwURBxEHDwcPCQ8LDQkNCwsNCw0LDQkNBw8JDwcPBQ8FEQURAxEDEwMTAxMBFQAVARcALwIrBCkIJwwlDiESHxQbGBkaFR4TIA0iCyQJKAMqASwAggMAFAIUABIEFAISBBIEEgQSBhIGEAgQCBAIEAoODA4MDgwODgwQDBAKEAoSChIIFAgUCBYGGAQYBhoCGgQcAh4ALgEqAygFJgkkDSANHhEaFRgXFBsSHQ4fDCUIJwQpAi0AGQEXAxcDFQcTBRMJEQkPCw8LDQ0PDQsNDQ8LEQsRCxEJEwkTCRMJEwcTBxUHFQUVBRUHFQUVBRUHFwcVBRUHCs4BkAMfOEUURxEfMwBvbBhAGBwaBiA=\\",\\n  \\"h\\":\\"BgABAUHYBJAGAAYBBgAGAQYDBgEEAwYDBAMEBQQDAgUEBQIFAAUCBQB1AAC5BhIT5wIAFhQAlAsRGOYCABEZAKMCeAAYABgBFgEWARQDFAMSBRIFEgUQBxAJDgcOCQ4LDgsMCwwNCg0KDQoNCA8GDwYPBhEEEQQRBBMEEQITAhUCEwAVAO0FFhPnAgAUEgD+BQ==\\",\\n  \\"g\\":\\"BgABArkBkAeACQCNCw8ZERkRFxEVExMVERUPFQ8XDRcLGQkZBxsFGwUdAR0BDQALAA0ADQINAAsCDQANAg0CDQILAg0EDQINBA0GDQQNBg0EDQYNCA0GDwgNCA0IDQgPCg0KDwwNDA8MDw4PDqIB7gEQDRALEAkQCQ4JEAcOBw4FDgUOAwwFDgMMAQwBDAEMAQwACgEKAAoACAIIAAgCCAIGAggCBgIGBAYCBgQEAgYEAqIBAQADAAEBAwADAAMABQADAAUAAwAFAAMABQAFAAMABQA3ABMAEwIRAhMCEQQRBBEEEQYRBg8IDwgPCA0KDQoNCg0MCwwLDgsOCQ4JDgkQBxAHEgcSBRIDFAMWAxQBFgEYABgA/gIAFgIWAhQEFgQUBBIGFAgSCBIIEAoSChAKDgwODA4MDg4MDgwODA4KEAgQCBAIEgYSBhIEEgYSBBQCEgIUAhQCOgAQABABDgEQAQ4BEAMOAw4FDgUOBQwFDgcMBQ4HDAkMB4oBUBgACbsCzQYAnAR/AC0RES0AnQMSKy4RgAEA\\",\\n  \\"f\\":\\"BgABAUH8A6QJBwAHAAUABwEFAQcBBQEFAwUDBQMDAwMDAwUDAwMFAQUAwQHCAQAWEgDZAhUUwQEAAOMEFhftAgAWFADKCQoSChIKEAoQCg4KDgwOCgwMDAoKDAwMCgwIDAgMCAwIDAYOCAwEDgYMBA4GDAIOBA4CDgQOAg4CDgAOAg4ADgC2AQAcDgDRAhkQowEA\\",\\n  \\"i\\":\\"BgACAQlQABISALoIERLqAgAREQC5CBIR6QIAAWELyAoADgIOAgwEDgIKBgwGCgYKCAoGCAgICggIBggGCgYKBAoECgQMBAoCDAIMAgwCDAAMAAwADAEMAQoBDAMKAwoDCgUKBQgFCgUIBwgHCAcICQgJBgkECwQJBA0CCwANAA0ADQELAQ0BCwMJBQsFCQUJBwkFBwcHBwcJBQcFCQUJBQkDCQMLAwkBCwELAQsACwALAAsCCwILAgkCCwIJBAkECQQJBgcGCQYHCAcIBwgHCgUKBQwFCgMMAQwBDgEMAA4=\\",\\n  \\"j\\":\\"BgACAWFKyAoADgIOAgwEDgIKBgwGCgYKCAoGCAgICggIBggGCgYKBAoECgQMBAoCDAIMAgwCDAAMAAwADAEMAQoBDAMKAwoDCgUKBQgFCgUIBwgHCAcICQgJBgkECwQJBA0CCwANAA0ADQELAQ0BCwMJBQsFCQUJBwkFBwcHBwcJBQcFCQUJBQkDCQMLAwkBCwELAQsACwALAAsCCwILAgkCCwIJBAkECQQJBgcGCQYHCAcIBwgHCgUKBQwFCgMMAQwBDgEMAA4BO+YCnwwJEQkRCQ8JDwsNCQ0LDQkLCwsJCQsLCQkLBwsHCwcLBwsFCwcNAwsFDQMLBQ0BDQMNAQ0DDQENAQ0ADQENAA0AVwAbDQDSAhoPQgAIAAgABgAIAgYCCAIGAgYEBgQGBAQEBAQEBgQEBAYCBgC4CRES6gIAEREAowo=\\",\\n  \\"k\\":\\"BgABARKoA/QFIAC0AYoD5gIAjwK5BJICwwTfAgDDAbIDFwAAnwMSEeUCABISAJILERLmAgAREQCvBQ==\\",\\n  \\"n\\":\\"BgABAW1yggmQAU8GBAgEBgQGBgYCCAQGBAYEBgQIAgYECAQGAggEBgIIBAgCCAQIAggCCAIIAgoACAIKAAgCCgAKAgoADAAKAgwAFgAWARQAFAEUAxQDFAMSAxIFEgUQBRIHEAkOBxAJDgsOCwwLDA0MDQoPCA8IEQgRBhEGEwYVBBUEFQIXAhkCGQDtBRQR5QIAFBAA/AUACAEIAQYBCAMGBQQFBgUEBwQFBAcCBwIHAgcCCQIHAAcACQAHAQcABwMHAQUDBwMFAwUFBQUDBQEFAwcBBwAHAPkFEhHjAgASEgDwCBAA\\",\\n  \\"m\\":\\"BgABAZoBfoIJigFbDAwMCg4KDggOCA4IDgYQBhAGEAQQBBAEEAISAhACEgAmASQDJAciCyANHhEcFRwXDg4QDBAKEAwQCBAKEggSBhIGEgYSBBQEEgIUAhICFAAUABQBEgEUARIDEgMSAxIFEgUQBxAHEAcQBw4JDgkOCw4LDAsMDQoNCg8KDwgPCBEIEQYRBBMEEwQTAhMCFQAVAP0FEhHlAgASEgCCBgAIAQgBBgEGAwYFBgUEBQQHBAUEBwIHAgcCBwIJAAcABwAJAAcBBwEHAQUBBwMFAwUDBQMDBQMFAwUBBQEHAQcAgQYSEeUCABISAIIGAAgBCAEGAQYDBgUGBQQFBAcEBQQHAgcCBwIHAgkABwAHAAkABwEHAQcBBQEHAwUDBQMFAwMFAwUDBQEFAQcBBwCBBhIR5QIAEhIA8AgYAA==\\",\\n  \\"l\\":\\"BgABAQnAAwDrAgASFgDWCxEa6gIAERkA0wsUFw==\\",\\n  \\"y\\":\\"BgABAZ8BogeNAg8ZERkRFxEVExMVERUPFQ8XDRcLGQkZBxsFGwUdAR0BDQALAA0ADQINAAsCDQANAg0CDQILAg0EDQINBA0GDQQNBg0EDQYNCA0GDwgNCA0IDQgPCg0KDwwNDA8MDw4PDqIB7gEQDRALEAkQCQ4JEAcOBw4FDgUOAwwFDgMMAQwBDAEMAQwACgEKAAoACAIIAAgCCAIGAggCBgIGBAYCBgQEAgYEAqIBAQADAAEBAwADAAMABQADAAUAAwAFAAMABQAFAAMABQA3ABMAEwIRABECEwQRAg8EEQQPBBEGDwgNCA8IDQgNCg0MDQwLDAkOCw4JDgcQBxAHEgUSBRQFFAMWARgDGAEaABwA9AUTEuQCABEPAP8FAAUCBQAFAgUEBQIDBAUEAwQDBgMEAQYDBgEGAAgBBgCAAQAAvAYREuICABMPAP0K\\",\\n  \\"q\\":\\"BgABAmj0A4YJFgAWARQAEgESAxADEAMOAw4FDgUMBQ4HDgcOBwwJDgmeAU4A2QwWGesCABYaAN4DAwADAAMBAwADAAUAAwADAAMABQAFAAUABwAHAQcACQAVABUCFQATAhUCEwQRAhMEEQQRBhEGDwgPCA8IDQoNDA0MCwwLDgkOCRAJEAkQBxIHEgUUBRYDFgMYARoBGgAcAP4CABYCFgIWBBYEFAQSBhQIEggSCBAKEgoQDA4MDgwODg4ODBAMDgwQChIIEAoSCBIGEgYUBhQEFAQWAhYCFgIWAApbkQYSKy4ReAAAjARTEjkRHykJMwDvAg==\\",\\n  \\"p\\":\\"BgABAmiCBIYJFgAWARYBFAEWAxQDEgUUBRIFEgcSBxAJEAkQCQ4LDgsOCwwNDA0KDwoPCg8IEQgRCBEGEwQTBhMCFQQVAhUAFQD9AgAbARkBFwMXAxcDEwUTBxMHEQcRCQ8JDQsNCw0LCw0LDQkPCQ0JDwURBxEFEQURAxMDEQMTARUBEwEVARUBFQAJAAcABwAFAAcABQAFAAMAAwADAAUAAwIDAAMAAwIDAADdAxYZ6wIAFhoA2gyeAU0OCgwIDgoMCA4GDgYMBg4GDgQQBBAEEgQUAhQCFgIWAApcoQMJNB8qNxJVEQCLBHgALhISLADwAg==\\",\\n  \\"o\\":\\"BgABAoMB8gOICRYAFgEWARQBFgMUAxIDFAUSBRIHEgcQBxAJEAkOCw4LDgsMDQwNCg8KDwoPCg8IEQgRBhMGEwQTBBMCFQIVABcAiwMAFwEVARUDEwMTAxMFEwcRBxEHDwkPCQ8LDQsNCw0NCw0LDwkNCw8HEQkPBxEHEQcRBRMFEwMTAxUDFQEVABUAFQAVAhUCFQITBBMEEwYTBhEGEQgRCA8KDwoPCg0KDQwNDAsOCw4JDgkQCRAJEgcSBxIFFAUUAxQDFgEWARYAFgCMAwAYAhYCFgQUBBQEFAYUCBIIEggQChAKEAwODA4MDg4MDgwQCg4KEgoQChIIEggSBhQGEgYUBBYEFAIWAhYCFgALYv0CHTZBFEMRHTcAjwMcNUITQhIiOACQAw==\\",\\n  \\"r\\":\\"BgACAQRigAkQAA8AAAABShAAhAFXDAwODAwKDgoOCBAIDgYQBhAEEAQQBBAEEAISABACEAAQAA4BEAAQARADEAEQAxADEAUSBRIHFAcUCxQLFA0WDVJFsQHzAQsMDQwLCgkICwgLCAkGCQYJBAkGBwIJBAcCBwQHAAcCBwAFAgcABQAHAQUABQEFAQUBBQEDAQUBAwMDAQMDAwEAmwYSEeMCABISAO4IEAA=\\",\\n  \\"u\\":\\"BgABAV2KBwGPAVANCQsHDQcNBw0FCwUNBQ0FDQMPAw8DEQMTARMBFQEVABUAFQITABMEEwITBBMEEQQRBhEGDwYRCA8KDQgPCg0MDQwLDAsOCRALDgcQBxIHEgUUBRQFFAMWAxgBGAEYARoA7gUTEuYCABMPAPsFAAcCBwIFBAcCBQYDBgUGAwgDBgMIAQgBCAEIAQoBCAAIAAoACAIIAggCCAIGBAgEBgQGBgYGBAYCBgQIAggACAD6BRES5AIAEREA7wgPAA==\\",\\n  \\"s\\":\\"BgABAasC/gLwBQoDCgMMBQ4DDgUOBRAFEAUSBRAHEgcQCRIJEAkSCxALEAsQDRANDg0ODw4PDA8MDwoRChEIEwYTBBcCFQIXABkBGQEXAxcFFQUTBRMHEwcRCREJDwkNCQ8LDQ0LCwsNCw0JDQkPBw8HDwUPBREDEQMRAREDEQETABEBEwARABMADwIRABECEQIRBBMCEwQVBBUEFQYVBhMIFwgVChUKFQxgsAIIAwYDCAMKAQgDCAMKAQoDCgEKAwoBCgMKAQwDCgEKAwoBDAMKAQoBCgEMAQoACgEKAAoBCgAKAQgACgAIAQgABgoECAIKAgoCCgAMAQoBDAUEBwIHBAcEBwIHBAkECQQJBAkECQYLBAkGCwYJBgsGCwYJCAsGCwgJBgsICQgLCAkICwgJCgkKCQoJCgcKCQwHDAcMBwwFDAcMAw4FDAMOAw4BDgMQARAAEAESABIAEgIQAg4CDgIOBA4CDgQMBAwEDAQMBgoECgYKBgoGCgYIBggGCAgIBggGBgYIBgYGBgYGBgYGBAgGBgQIBAYECAQQChIIEggSBhIEEgQSBBQCFAISABQAEgASABIAEgESARIBEAEQAxIDDgMQAxADDgUOBQwDDAMMAwoDCAMIAQYBe6cCAwIDAgUAAwIFAgUCBwIFAgcCBQIHAgUCBwIHAAUCBwIHAgUABwIHAgcABQIHAAcCBwAFAgUABQIFAAUABQIDAAEAAQABAQEAAQEBAQEBAQEBAQEDAQEAAwEBAQMAAwEDAAMBAwADAQMAAwABAQMAAwADAAEAAwIBAAMCAQQDAgE=\\",\\n  \\"t\\":\\"BgABAUe8BLACWAAaEADRAhsOaQANAA0ADwINAA0CDQANAg0CDQINBA0CCwYNBA0GCwYNBgsIDQgLCAsKCwgJDAsKCQwJDAkOCQ4HEAcSBxIHEgUUAOAEawAVEQDWAhYTbAAAygIVFOYCABUXAMUCogEAFhQA1QIVEqEBAADzAwIFBAMEBQQDBAMEAwYDBgMGAwYBCAEGAQgBBgEIAAgA\\",\\n  \\"w\\":\\"BgABARz8BsAEINYCKNgBERLuAgARD+8B3QgSEc0CABQSW7YCV7UCFBHJAgASEpMC3AgREvACABERmAHxBDDaAVeYAxES7gIAEREo1QE81wIIAA==\\",\\n  \\"z\\":\\"BgABAQ6cA9AGuQIAFw8AzAIaC9QFAAAr9wKjBuACABYQAMsCGQyZBgCaA9AG\\"\\n   }';\\nBEGIN\\n\\n  IF font IS NULL THEN\\n    font := font\_default;\\n  END IF;\\n\\n  \-- For character spacing, use m as guide size\\n  geom := ST\_GeomFromTWKB(decode(font-\>\>'m', 'base64'));\\n  m\_width := ST\_XMax(geom) \- ST\_XMin(geom);\\n  spacing := m\_width / 12;\\n\\n  letterarray := regexp\_split\_to\_array(replace(letters, ' ', E'\\\\t'), E'');\\n  FOREACH letter IN ARRAY letterarray\\n  LOOP\\n    geom := ST\_GeomFromTWKB(decode(font-\>\>(letter), 'base64'));\\n    \-- Chars are not already zeroed out, so do it now\\n    geom := ST\_Translate(geom, \-1 \* ST\_XMin(geom), 0.0);\\n    \-- unknown characters are treated as spaces\\n    IF geom IS NULL THEN\\n      \-- spaces are a \\"quarter m\\" in width\\n      width := m\_width / 3.5;\\n    ELSE\\n      width := (ST\_XMax(geom) \- ST\_XMin(geom));\\n    END IF;\\n    geom := ST\_Translate(geom, position, 0.0);\\n    \-- Tighten up spacing when characters have a large gap\\n    \-- between them like Yo or To\\n    adjustment := 0.0;\\n    IF prevgeom IS NOT NULL AND geom IS NOT NULL THEN\\n      dist \= ST\_Distance(prevgeom, geom);\\n      IF dist \> spacing THEN\\n        adjustment \= spacing \- dist;\\n        geom := ST\_Translate(geom, adjustment, 0.0);\\n      END IF;\\n    END IF;\\n    prevgeom := geom;\\n    position := position \+ width \+ spacing \+ adjustment;\\n    wordarr := array\_append(wordarr, geom);\\n  END LOOP;\\n  \-- apply the start point and scaling options\\n  wordgeom := ST\_CollectionExtract(ST\_Collect(wordarr));\\n  wordgeom := ST\_Scale(wordgeom,\\n                text\_height/font\_default\_height,\\n                text\_height/font\_default\_height);\\n  return wordgeom;\\nEND;\\n$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_linecrossingdirection",  
    "arguments": "line1 geometry, line2 geometry",  
    "return\_type": "integer",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_linecrossingdirection(line1 geometry, line2 geometry)\\n RETURNS integer\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 10000 SUPPORT postgis\_index\_supportfn\\nAS '$libdir/postgis-3', $function$ST\_LineCrossingDirection$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_linefromencodedpolyline",  
    "arguments": "txtin text, nprecision integer DEFAULT 5",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_linefromencodedpolyline(txtin text, nprecision integer DEFAULT 5)\\n RETURNS geometry\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 500\\nAS '$libdir/postgis-3', $function$line\_from\_encoded\_polyline$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_linefrommultipoint",  
    "arguments": "geometry",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_linefrommultipoint(geometry)\\n RETURNS geometry\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 50\\nAS '$libdir/postgis-3', $function$LWGEOM\_line\_from\_mpoint$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_linefromtext",  
    "arguments": "text, integer",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_linefromtext(text, integer)\\n RETURNS geometry\\n LANGUAGE sql\\n IMMUTABLE PARALLEL SAFE STRICT COST 500\\nAS $function$\\n\\tSELECT CASE WHEN public.geometrytype(public.ST\_GeomFromText($1, $2)) \= 'LINESTRING'\\n\\tTHEN public.ST\_GeomFromText($1,$2)\\n\\tELSE NULL END\\n\\t$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_linefromtext",  
    "arguments": "text",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_linefromtext(text)\\n RETURNS geometry\\n LANGUAGE sql\\n IMMUTABLE PARALLEL SAFE STRICT COST 500\\nAS $function$\\n\\tSELECT CASE WHEN public.geometrytype(public.ST\_GeomFromText($1)) \= 'LINESTRING'\\n\\tTHEN public.ST\_GeomFromText($1)\\n\\tELSE NULL END\\n\\t$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_linefromwkb",  
    "arguments": "bytea, integer",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_linefromwkb(bytea, integer)\\n RETURNS geometry\\n LANGUAGE sql\\n IMMUTABLE PARALLEL SAFE STRICT COST 50\\nAS $function$\\n\\tSELECT CASE WHEN public.geometrytype(public.ST\_GeomFromWKB($1, $2)) \= 'LINESTRING'\\n\\tTHEN public.ST\_GeomFromWKB($1, $2)\\n\\tELSE NULL END\\n\\t$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_linefromwkb",  
    "arguments": "bytea",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_linefromwkb(bytea)\\n RETURNS geometry\\n LANGUAGE sql\\n IMMUTABLE PARALLEL SAFE STRICT COST 50\\nAS $function$\\n\\tSELECT CASE WHEN public.geometrytype(public.ST\_GeomFromWKB($1)) \= 'LINESTRING'\\n\\tTHEN public.ST\_GeomFromWKB($1)\\n\\tELSE NULL END\\n\\t$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_lineinterpolatepoint",  
    "arguments": "geometry, double precision",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_lineinterpolatepoint(geometry, double precision)\\n RETURNS geometry\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 500\\nAS '$libdir/postgis-3', $function$LWGEOM\_line\_interpolate\_point$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_lineinterpolatepoints",  
    "arguments": "geometry, double precision, repeat boolean DEFAULT true",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_lineinterpolatepoints(geometry, double precision, repeat boolean DEFAULT true)\\n RETURNS geometry\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 500\\nAS '$libdir/postgis-3', $function$LWGEOM\_line\_interpolate\_point$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_linelocatepoint",  
    "arguments": "geom1 geometry, geom2 geometry",  
    "return\_type": "double precision",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_linelocatepoint(geom1 geometry, geom2 geometry)\\n RETURNS double precision\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 500\\nAS '$libdir/postgis-3', $function$LWGEOM\_line\_locate\_point$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_linemerge",  
    "arguments": "geometry",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_linemerge(geometry)\\n RETURNS geometry\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 10000\\nAS '$libdir/postgis-3', $function$linemerge$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_linemerge",  
    "arguments": "geometry, boolean",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_linemerge(geometry, boolean)\\n RETURNS geometry\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 10000\\nAS '$libdir/postgis-3', $function$linemerge$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_linestringfromwkb",  
    "arguments": "bytea, integer",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_linestringfromwkb(bytea, integer)\\n RETURNS geometry\\n LANGUAGE sql\\n IMMUTABLE PARALLEL SAFE STRICT COST 50\\nAS $function$\\n\\tSELECT CASE WHEN public.geometrytype(public.ST\_GeomFromWKB($1, $2)) \= 'LINESTRING'\\n\\tTHEN public.ST\_GeomFromWKB($1, $2)\\n\\tELSE NULL END\\n\\t$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_linestringfromwkb",  
    "arguments": "bytea",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_linestringfromwkb(bytea)\\n RETURNS geometry\\n LANGUAGE sql\\n IMMUTABLE PARALLEL SAFE STRICT COST 50\\nAS $function$\\n\\tSELECT CASE WHEN public.geometrytype(public.ST\_GeomFromWKB($1)) \= 'LINESTRING'\\n\\tTHEN public.ST\_GeomFromWKB($1)\\n\\tELSE NULL END\\n\\t$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_linesubstring",  
    "arguments": "geometry, double precision, double precision",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_linesubstring(geometry, double precision, double precision)\\n RETURNS geometry\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 500\\nAS '$libdir/postgis-3', $function$LWGEOM\_line\_substring$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_linetocurve",  
    "arguments": "geometry geometry",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_linetocurve(geometry geometry)\\n RETURNS geometry\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 10000\\nAS '$libdir/postgis-3', $function$LWGEOM\_line\_desegmentize$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_locatealong",  
    "arguments": "geometry geometry, measure double precision, leftrightoffset double precision DEFAULT 0.0",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_locatealong(geometry geometry, measure double precision, leftrightoffset double precision DEFAULT 0.0)\\n RETURNS geometry\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 500\\nAS '$libdir/postgis-3', $function$ST\_LocateAlong$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_locatebetween",  
    "arguments": "geometry geometry, frommeasure double precision, tomeasure double precision, leftrightoffset double precision DEFAULT 0.0",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_locatebetween(geometry geometry, frommeasure double precision, tomeasure double precision, leftrightoffset double precision DEFAULT 0.0)\\n RETURNS geometry\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 500\\nAS '$libdir/postgis-3', $function$ST\_LocateBetween$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_locatebetweenelevations",  
    "arguments": "geometry geometry, fromelevation double precision, toelevation double precision",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_locatebetweenelevations(geometry geometry, fromelevation double precision, toelevation double precision)\\n RETURNS geometry\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 500\\nAS '$libdir/postgis-3', $function$ST\_LocateBetweenElevations$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_longestline",  
    "arguments": "geom1 geometry, geom2 geometry",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_longestline(geom1 geometry, geom2 geometry)\\n RETURNS geometry\\n LANGUAGE sql\\n IMMUTABLE PARALLEL SAFE STRICT COST 10000\\nAS $function$SELECT public.\_ST\_LongestLine(public.ST\_ConvexHull($1), public.ST\_ConvexHull($2))$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_m",  
    "arguments": "geometry",  
    "return\_type": "double precision",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_m(geometry)\\n RETURNS double precision\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/postgis-3', $function$LWGEOM\_m\_point$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_makebox2d",  
    "arguments": "geom1 geometry, geom2 geometry",  
    "return\_type": "box2d",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_makebox2d(geom1 geometry, geom2 geometry)\\n RETURNS box2d\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/postgis-3', $function$BOX2D\_construct$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_makeenvelope",  
    "arguments": "double precision, double precision, double precision, double precision, integer DEFAULT 0",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_makeenvelope(double precision, double precision, double precision, double precision, integer DEFAULT 0)\\n RETURNS geometry\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 50\\nAS '$libdir/postgis-3', $function$ST\_MakeEnvelope$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_makeline",  
    "arguments": "geometry\[\]",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_makeline(geometry\[\])\\n RETURNS geometry\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 50\\nAS '$libdir/postgis-3', $function$LWGEOM\_makeline\_garray$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_makeline",  
    "arguments": "geom1 geometry, geom2 geometry",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_makeline(geom1 geometry, geom2 geometry)\\n RETURNS geometry\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 50\\nAS '$libdir/postgis-3', $function$LWGEOM\_makeline$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_makepoint",  
    "arguments": "double precision, double precision",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_makepoint(double precision, double precision)\\n RETURNS geometry\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 50\\nAS '$libdir/postgis-3', $function$LWGEOM\_makepoint$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_makepoint",  
    "arguments": "double precision, double precision, double precision",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_makepoint(double precision, double precision, double precision)\\n RETURNS geometry\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 50\\nAS '$libdir/postgis-3', $function$LWGEOM\_makepoint$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_makepoint",  
    "arguments": "double precision, double precision, double precision, double precision",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_makepoint(double precision, double precision, double precision, double precision)\\n RETURNS geometry\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 50\\nAS '$libdir/postgis-3', $function$LWGEOM\_makepoint$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_makepointm",  
    "arguments": "double precision, double precision, double precision",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_makepointm(double precision, double precision, double precision)\\n RETURNS geometry\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 50\\nAS '$libdir/postgis-3', $function$LWGEOM\_makepoint3dm$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_makepolygon",  
    "arguments": "geometry",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_makepolygon(geometry)\\n RETURNS geometry\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 50\\nAS '$libdir/postgis-3', $function$LWGEOM\_makepoly$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_makepolygon",  
    "arguments": "geometry, geometry\[\]",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_makepolygon(geometry, geometry\[\])\\n RETURNS geometry\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 50\\nAS '$libdir/postgis-3', $function$LWGEOM\_makepoly$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_makevalid",  
    "arguments": "geom geometry, params text",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_makevalid(geom geometry, params text)\\n RETURNS geometry\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 10000\\nAS '$libdir/postgis-3', $function$ST\_MakeValid$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_makevalid",  
    "arguments": "geometry",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_makevalid(geometry)\\n RETURNS geometry\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 10000\\nAS '$libdir/postgis-3', $function$ST\_MakeValid$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_maxdistance",  
    "arguments": "geom1 geometry, geom2 geometry",  
    "return\_type": "double precision",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_maxdistance(geom1 geometry, geom2 geometry)\\n RETURNS double precision\\n LANGUAGE sql\\n IMMUTABLE PARALLEL SAFE STRICT COST 10000\\nAS $function$SELECT public.\_ST\_MaxDistance(public.ST\_ConvexHull($1), public.ST\_ConvexHull($2))$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_maximuminscribedcircle",  
    "arguments": "geometry, OUT center geometry, OUT nearest geometry, OUT radius double precision",  
    "return\_type": "record",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_maximuminscribedcircle(geometry, OUT center geometry, OUT nearest geometry, OUT radius double precision)\\n RETURNS record\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 10000\\nAS '$libdir/postgis-3', $function$ST\_MaximumInscribedCircle$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_memsize",  
    "arguments": "geometry",  
    "return\_type": "integer",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_memsize(geometry)\\n RETURNS integer\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/postgis-3', $function$LWGEOM\_mem\_size$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_minimumboundingcircle",  
    "arguments": "inputgeom geometry, segs\_per\_quarter integer DEFAULT 48",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_minimumboundingcircle(inputgeom geometry, segs\_per\_quarter integer DEFAULT 48)\\n RETURNS geometry\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 10000\\nAS '$libdir/postgis-3', $function$ST\_MinimumBoundingCircle$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_minimumboundingradius",  
    "arguments": "geometry, OUT center geometry, OUT radius double precision",  
    "return\_type": "record",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_minimumboundingradius(geometry, OUT center geometry, OUT radius double precision)\\n RETURNS record\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 10000\\nAS '$libdir/postgis-3', $function$ST\_MinimumBoundingRadius$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_minimumclearance",  
    "arguments": "geometry",  
    "return\_type": "double precision",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_minimumclearance(geometry)\\n RETURNS double precision\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 10000\\nAS '$libdir/postgis-3', $function$ST\_MinimumClearance$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_minimumclearanceline",  
    "arguments": "geometry",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_minimumclearanceline(geometry)\\n RETURNS geometry\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 10000\\nAS '$libdir/postgis-3', $function$ST\_MinimumClearanceLine$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_mlinefromtext",  
    "arguments": "text",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_mlinefromtext(text)\\n RETURNS geometry\\n LANGUAGE sql\\n IMMUTABLE PARALLEL SAFE STRICT COST 500\\nAS $function$\\n\\tSELECT CASE WHEN public.geometrytype(public.ST\_GeomFromText($1)) \= 'MULTILINESTRING'\\n\\tTHEN public.ST\_GeomFromText($1)\\n\\tELSE NULL END\\n\\t$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_mlinefromtext",  
    "arguments": "text, integer",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_mlinefromtext(text, integer)\\n RETURNS geometry\\n LANGUAGE sql\\n IMMUTABLE PARALLEL SAFE STRICT COST 500\\nAS $function$\\n\\tSELECT CASE\\n\\tWHEN public.geometrytype(public.ST\_GeomFromText($1, $2)) \= 'MULTILINESTRING'\\n\\tTHEN public.ST\_GeomFromText($1,$2)\\n\\tELSE NULL END\\n\\t$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_mlinefromwkb",  
    "arguments": "bytea, integer",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_mlinefromwkb(bytea, integer)\\n RETURNS geometry\\n LANGUAGE sql\\n IMMUTABLE PARALLEL SAFE STRICT COST 50\\nAS $function$\\n\\tSELECT CASE WHEN public.geometrytype(public.ST\_GeomFromWKB($1, $2)) \= 'MULTILINESTRING'\\n\\tTHEN public.ST\_GeomFromWKB($1, $2)\\n\\tELSE NULL END\\n\\t$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_mlinefromwkb",  
    "arguments": "bytea",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_mlinefromwkb(bytea)\\n RETURNS geometry\\n LANGUAGE sql\\n IMMUTABLE PARALLEL SAFE STRICT COST 50\\nAS $function$\\n\\tSELECT CASE WHEN public.geometrytype(public.ST\_GeomFromWKB($1)) \= 'MULTILINESTRING'\\n\\tTHEN public.ST\_GeomFromWKB($1)\\n\\tELSE NULL END\\n\\t$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_mpointfromtext",  
    "arguments": "text",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_mpointfromtext(text)\\n RETURNS geometry\\n LANGUAGE sql\\n IMMUTABLE PARALLEL SAFE STRICT COST 500\\nAS $function$\\n\\tSELECT CASE WHEN public.geometrytype(public.ST\_GeomFromText($1)) \= 'MULTIPOINT'\\n\\tTHEN public.ST\_GeomFromText($1)\\n\\tELSE NULL END\\n\\t$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_mpointfromtext",  
    "arguments": "text, integer",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_mpointfromtext(text, integer)\\n RETURNS geometry\\n LANGUAGE sql\\n IMMUTABLE PARALLEL SAFE STRICT COST 500\\nAS $function$\\n\\tSELECT CASE WHEN public.geometrytype(public.ST\_GeomFromText($1, $2)) \= 'MULTIPOINT'\\n\\tTHEN ST\_GeomFromText($1, $2)\\n\\tELSE NULL END\\n\\t$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_mpointfromwkb",  
    "arguments": "bytea",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_mpointfromwkb(bytea)\\n RETURNS geometry\\n LANGUAGE sql\\n IMMUTABLE PARALLEL SAFE STRICT COST 50\\nAS $function$\\n\\tSELECT CASE WHEN public.geometrytype(public.ST\_GeomFromWKB($1)) \= 'MULTIPOINT'\\n\\tTHEN public.ST\_GeomFromWKB($1)\\n\\tELSE NULL END\\n\\t$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_mpointfromwkb",  
    "arguments": "bytea, integer",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_mpointfromwkb(bytea, integer)\\n RETURNS geometry\\n LANGUAGE sql\\n IMMUTABLE PARALLEL SAFE STRICT COST 50\\nAS $function$\\n\\tSELECT CASE WHEN public.geometrytype(public.ST\_GeomFromWKB($1, $2)) \= 'MULTIPOINT'\\n\\tTHEN public.ST\_GeomFromWKB($1, $2)\\n\\tELSE NULL END\\n\\t$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_mpolyfromtext",  
    "arguments": "text",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_mpolyfromtext(text)\\n RETURNS geometry\\n LANGUAGE sql\\n IMMUTABLE PARALLEL SAFE STRICT COST 500\\nAS $function$\\n\\tSELECT CASE WHEN public.geometrytype(public.ST\_GeomFromText($1)) \= 'MULTIPOLYGON'\\n\\tTHEN public.ST\_GeomFromText($1)\\n\\tELSE NULL END\\n\\t$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_mpolyfromtext",  
    "arguments": "text, integer",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_mpolyfromtext(text, integer)\\n RETURNS geometry\\n LANGUAGE sql\\n IMMUTABLE PARALLEL SAFE STRICT COST 500\\nAS $function$\\n\\tSELECT CASE WHEN public.geometrytype(public.ST\_GeomFromText($1, $2)) \= 'MULTIPOLYGON'\\n\\tTHEN public.ST\_GeomFromText($1,$2)\\n\\tELSE NULL END\\n\\t$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_mpolyfromwkb",  
    "arguments": "bytea",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_mpolyfromwkb(bytea)\\n RETURNS geometry\\n LANGUAGE sql\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS $function$\\n\\tSELECT CASE WHEN public.geometrytype(public.ST\_GeomFromWKB($1)) \= 'MULTIPOLYGON'\\n\\tTHEN public.ST\_GeomFromWKB($1)\\n\\tELSE NULL END\\n\\t$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_mpolyfromwkb",  
    "arguments": "bytea, integer",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_mpolyfromwkb(bytea, integer)\\n RETURNS geometry\\n LANGUAGE sql\\n IMMUTABLE PARALLEL SAFE STRICT COST 50\\nAS $function$\\n\\tSELECT CASE WHEN public.geometrytype(public.ST\_GeomFromWKB($1, $2)) \= 'MULTIPOLYGON'\\n\\tTHEN public.ST\_GeomFromWKB($1, $2)\\n\\tELSE NULL END\\n\\t$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_multi",  
    "arguments": "geometry",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_multi(geometry)\\n RETURNS geometry\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 50\\nAS '$libdir/postgis-3', $function$LWGEOM\_force\_multi$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_multilinefromwkb",  
    "arguments": "bytea",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_multilinefromwkb(bytea)\\n RETURNS geometry\\n LANGUAGE sql\\n IMMUTABLE PARALLEL SAFE STRICT COST 50\\nAS $function$\\n\\tSELECT CASE WHEN public.geometrytype(public.ST\_GeomFromWKB($1)) \= 'MULTILINESTRING'\\n\\tTHEN public.ST\_GeomFromWKB($1)\\n\\tELSE NULL END\\n\\t$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_multilinestringfromtext",  
    "arguments": "text",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_multilinestringfromtext(text)\\n RETURNS geometry\\n LANGUAGE sql\\n IMMUTABLE PARALLEL SAFE STRICT COST 500\\nAS $function$SELECT public.ST\_MLineFromText($1)$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_multilinestringfromtext",  
    "arguments": "text, integer",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_multilinestringfromtext(text, integer)\\n RETURNS geometry\\n LANGUAGE sql\\n IMMUTABLE PARALLEL SAFE STRICT COST 500\\nAS $function$SELECT public.ST\_MLineFromText($1, $2)$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_multipointfromtext",  
    "arguments": "text",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_multipointfromtext(text)\\n RETURNS geometry\\n LANGUAGE sql\\n IMMUTABLE PARALLEL SAFE STRICT COST 500\\nAS $function$SELECT public.ST\_MPointFromText($1)$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_multipointfromwkb",  
    "arguments": "bytea",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_multipointfromwkb(bytea)\\n RETURNS geometry\\n LANGUAGE sql\\n IMMUTABLE PARALLEL SAFE STRICT COST 50\\nAS $function$\\n\\tSELECT CASE WHEN public.geometrytype(public.ST\_GeomFromWKB($1)) \= 'MULTIPOINT'\\n\\tTHEN public.ST\_GeomFromWKB($1)\\n\\tELSE NULL END\\n\\t$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_multipointfromwkb",  
    "arguments": "bytea, integer",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_multipointfromwkb(bytea, integer)\\n RETURNS geometry\\n LANGUAGE sql\\n IMMUTABLE PARALLEL SAFE STRICT COST 50\\nAS $function$\\n\\tSELECT CASE WHEN public.geometrytype(public.ST\_GeomFromWKB($1,$2)) \= 'MULTIPOINT'\\n\\tTHEN public.ST\_GeomFromWKB($1, $2)\\n\\tELSE NULL END\\n\\t$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_multipolyfromwkb",  
    "arguments": "bytea, integer",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_multipolyfromwkb(bytea, integer)\\n RETURNS geometry\\n LANGUAGE sql\\n IMMUTABLE PARALLEL SAFE STRICT COST 50\\nAS $function$\\n\\tSELECT CASE WHEN public.geometrytype(public.ST\_GeomFromWKB($1, $2)) \= 'MULTIPOLYGON'\\n\\tTHEN public.ST\_GeomFromWKB($1, $2)\\n\\tELSE NULL END\\n\\t$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_multipolyfromwkb",  
    "arguments": "bytea",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_multipolyfromwkb(bytea)\\n RETURNS geometry\\n LANGUAGE sql\\n IMMUTABLE PARALLEL SAFE STRICT COST 50\\nAS $function$\\n\\tSELECT CASE WHEN public.geometrytype(public.ST\_GeomFromWKB($1)) \= 'MULTIPOLYGON'\\n\\tTHEN public.ST\_GeomFromWKB($1)\\n\\tELSE NULL END\\n\\t$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_multipolygonfromtext",  
    "arguments": "text",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_multipolygonfromtext(text)\\n RETURNS geometry\\n LANGUAGE sql\\n IMMUTABLE PARALLEL SAFE STRICT COST 500\\nAS $function$SELECT public.ST\_MPolyFromText($1)$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_multipolygonfromtext",  
    "arguments": "text, integer",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_multipolygonfromtext(text, integer)\\n RETURNS geometry\\n LANGUAGE sql\\n IMMUTABLE PARALLEL SAFE STRICT COST 500\\nAS $function$SELECT public.ST\_MPolyFromText($1, $2)$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_ndims",  
    "arguments": "geometry",  
    "return\_type": "smallint",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_ndims(geometry)\\n RETURNS smallint\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/postgis-3', $function$LWGEOM\_ndims$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_node",  
    "arguments": "g geometry",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_node(g geometry)\\n RETURNS geometry\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 10000\\nAS '$libdir/postgis-3', $function$ST\_Node$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_normalize",  
    "arguments": "geom geometry",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_normalize(geom geometry)\\n RETURNS geometry\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 500\\nAS '$libdir/postgis-3', $function$ST\_Normalize$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_npoints",  
    "arguments": "geometry",  
    "return\_type": "integer",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_npoints(geometry)\\n RETURNS integer\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 50\\nAS '$libdir/postgis-3', $function$LWGEOM\_npoints$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_nrings",  
    "arguments": "geometry",  
    "return\_type": "integer",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_nrings(geometry)\\n RETURNS integer\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 50\\nAS '$libdir/postgis-3', $function$LWGEOM\_nrings$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_numgeometries",  
    "arguments": "geometry",  
    "return\_type": "integer",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_numgeometries(geometry)\\n RETURNS integer\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 50\\nAS '$libdir/postgis-3', $function$LWGEOM\_numgeometries\_collection$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_numinteriorring",  
    "arguments": "geometry",  
    "return\_type": "integer",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_numinteriorring(geometry)\\n RETURNS integer\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 50\\nAS '$libdir/postgis-3', $function$LWGEOM\_numinteriorrings\_polygon$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_numinteriorrings",  
    "arguments": "geometry",  
    "return\_type": "integer",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_numinteriorrings(geometry)\\n RETURNS integer\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 50\\nAS '$libdir/postgis-3', $function$LWGEOM\_numinteriorrings\_polygon$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_numpatches",  
    "arguments": "geometry",  
    "return\_type": "integer",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_numpatches(geometry)\\n RETURNS integer\\n LANGUAGE sql\\n IMMUTABLE PARALLEL SAFE STRICT COST 50\\nAS $function$\\n\\tSELECT CASE WHEN public.ST\_GeometryType($1) \= 'ST\_PolyhedralSurface'\\n\\tTHEN public.ST\_NumGeometries($1)\\n\\tELSE NULL END\\n\\t$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_numpoints",  
    "arguments": "geometry",  
    "return\_type": "integer",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_numpoints(geometry)\\n RETURNS integer\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 50\\nAS '$libdir/postgis-3', $function$LWGEOM\_numpoints\_linestring$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_offsetcurve",  
    "arguments": "line geometry, distance double precision, params text DEFAULT ''::text",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_offsetcurve(line geometry, distance double precision, params text DEFAULT ''::text)\\n RETURNS geometry\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 10000\\nAS '$libdir/postgis-3', $function$ST\_OffsetCurve$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_orderingequals",  
    "arguments": "geom1 geometry, geom2 geometry",  
    "return\_type": "boolean",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_orderingequals(geom1 geometry, geom2 geometry)\\n RETURNS boolean\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 10000 SUPPORT postgis\_index\_supportfn\\nAS '$libdir/postgis-3', $function$LWGEOM\_same$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_orientedenvelope",  
    "arguments": "geometry",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_orientedenvelope(geometry)\\n RETURNS geometry\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 10000\\nAS '$libdir/postgis-3', $function$ST\_OrientedEnvelope$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_overlaps",  
    "arguments": "geom1 geometry, geom2 geometry",  
    "return\_type": "boolean",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_overlaps(geom1 geometry, geom2 geometry)\\n RETURNS boolean\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 10000 SUPPORT postgis\_index\_supportfn\\nAS '$libdir/postgis-3', $function$overlaps$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_patchn",  
    "arguments": "geometry, integer",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_patchn(geometry, integer)\\n RETURNS geometry\\n LANGUAGE sql\\n IMMUTABLE PARALLEL SAFE STRICT COST 50\\nAS $function$\\n\\tSELECT CASE WHEN public.ST\_GeometryType($1) \= 'ST\_PolyhedralSurface'\\n\\tTHEN public.ST\_GeometryN($1, $2)\\n\\tELSE NULL END\\n\\t$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_perimeter",  
    "arguments": "geog geography, use\_spheroid boolean DEFAULT true",  
    "return\_type": "double precision",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_perimeter(geog geography, use\_spheroid boolean DEFAULT true)\\n RETURNS double precision\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 500\\nAS '$libdir/postgis-3', $function$geography\_perimeter$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_perimeter",  
    "arguments": "geometry",  
    "return\_type": "double precision",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_perimeter(geometry)\\n RETURNS double precision\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 50\\nAS '$libdir/postgis-3', $function$LWGEOM\_perimeter2d\_poly$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_perimeter2d",  
    "arguments": "geometry",  
    "return\_type": "double precision",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_perimeter2d(geometry)\\n RETURNS double precision\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 50\\nAS '$libdir/postgis-3', $function$LWGEOM\_perimeter2d\_poly$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_point",  
    "arguments": "double precision, double precision, srid integer",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_point(double precision, double precision, srid integer)\\n RETURNS geometry\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 50\\nAS '$libdir/postgis-3', $function$ST\_Point$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_point",  
    "arguments": "double precision, double precision",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_point(double precision, double precision)\\n RETURNS geometry\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 50\\nAS '$libdir/postgis-3', $function$LWGEOM\_makepoint$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_pointfromgeohash",  
    "arguments": "text, integer DEFAULT NULL::integer",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_pointfromgeohash(text, integer DEFAULT NULL::integer)\\n RETURNS geometry\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE COST 50\\nAS '$libdir/postgis-3', $function$point\_from\_geohash$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_pointfromtext",  
    "arguments": "text",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_pointfromtext(text)\\n RETURNS geometry\\n LANGUAGE sql\\n IMMUTABLE PARALLEL SAFE STRICT COST 500\\nAS $function$\\n\\tSELECT CASE WHEN public.geometrytype(public.ST\_GeomFromText($1)) \= 'POINT'\\n\\tTHEN public.ST\_GeomFromText($1)\\n\\tELSE NULL END\\n\\t$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_pointfromtext",  
    "arguments": "text, integer",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_pointfromtext(text, integer)\\n RETURNS geometry\\n LANGUAGE sql\\n IMMUTABLE PARALLEL SAFE STRICT COST 500\\nAS $function$\\n\\tSELECT CASE WHEN public.geometrytype(public.ST\_GeomFromText($1, $2)) \= 'POINT'\\n\\tTHEN public.ST\_GeomFromText($1, $2)\\n\\tELSE NULL END\\n\\t$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_pointfromwkb",  
    "arguments": "bytea",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_pointfromwkb(bytea)\\n RETURNS geometry\\n LANGUAGE sql\\n IMMUTABLE PARALLEL SAFE STRICT COST 50\\nAS $function$\\n\\tSELECT CASE WHEN public.geometrytype(public.ST\_GeomFromWKB($1)) \= 'POINT'\\n\\tTHEN public.ST\_GeomFromWKB($1)\\n\\tELSE NULL END\\n\\t$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_pointfromwkb",  
    "arguments": "bytea, integer",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_pointfromwkb(bytea, integer)\\n RETURNS geometry\\n LANGUAGE sql\\n IMMUTABLE PARALLEL SAFE STRICT COST 50\\nAS $function$\\n\\tSELECT CASE WHEN public.geometrytype(public.ST\_GeomFromWKB($1, $2)) \= 'POINT'\\n\\tTHEN public.ST\_GeomFromWKB($1, $2)\\n\\tELSE NULL END\\n\\t$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_pointinsidecircle",  
    "arguments": "geometry, double precision, double precision, double precision",  
    "return\_type": "boolean",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_pointinsidecircle(geometry, double precision, double precision, double precision)\\n RETURNS boolean\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 500\\nAS '$libdir/postgis-3', $function$LWGEOM\_inside\_circle\_point$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_pointm",  
    "arguments": "xcoordinate double precision, ycoordinate double precision, mcoordinate double precision, srid integer DEFAULT 0",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_pointm(xcoordinate double precision, ycoordinate double precision, mcoordinate double precision, srid integer DEFAULT 0)\\n RETURNS geometry\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 50\\nAS '$libdir/postgis-3', $function$ST\_PointM$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_pointn",  
    "arguments": "geometry, integer",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_pointn(geometry, integer)\\n RETURNS geometry\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 50\\nAS '$libdir/postgis-3', $function$LWGEOM\_pointn\_linestring$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_pointonsurface",  
    "arguments": "geometry",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_pointonsurface(geometry)\\n RETURNS geometry\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 500\\nAS '$libdir/postgis-3', $function$pointonsurface$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_points",  
    "arguments": "geometry",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_points(geometry)\\n RETURNS geometry\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 500\\nAS '$libdir/postgis-3', $function$ST\_Points$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_pointz",  
    "arguments": "xcoordinate double precision, ycoordinate double precision, zcoordinate double precision, srid integer DEFAULT 0",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_pointz(xcoordinate double precision, ycoordinate double precision, zcoordinate double precision, srid integer DEFAULT 0)\\n RETURNS geometry\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 50\\nAS '$libdir/postgis-3', $function$ST\_PointZ$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_pointzm",  
    "arguments": "xcoordinate double precision, ycoordinate double precision, zcoordinate double precision, mcoordinate double precision, srid integer DEFAULT 0",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_pointzm(xcoordinate double precision, ycoordinate double precision, zcoordinate double precision, mcoordinate double precision, srid integer DEFAULT 0)\\n RETURNS geometry\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 50\\nAS '$libdir/postgis-3', $function$ST\_PointZM$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_polyfromtext",  
    "arguments": "text, integer",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_polyfromtext(text, integer)\\n RETURNS geometry\\n LANGUAGE sql\\n IMMUTABLE PARALLEL SAFE STRICT COST 500\\nAS $function$\\n\\tSELECT CASE WHEN public.geometrytype(public.ST\_GeomFromText($1, $2)) \= 'POLYGON'\\n\\tTHEN public.ST\_GeomFromText($1, $2)\\n\\tELSE NULL END\\n\\t$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_polyfromtext",  
    "arguments": "text",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_polyfromtext(text)\\n RETURNS geometry\\n LANGUAGE sql\\n IMMUTABLE PARALLEL SAFE STRICT COST 500\\nAS $function$\\n\\tSELECT CASE WHEN public.geometrytype(public.ST\_GeomFromText($1)) \= 'POLYGON'\\n\\tTHEN public.ST\_GeomFromText($1)\\n\\tELSE NULL END\\n\\t$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_polyfromwkb",  
    "arguments": "bytea, integer",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_polyfromwkb(bytea, integer)\\n RETURNS geometry\\n LANGUAGE sql\\n IMMUTABLE PARALLEL SAFE STRICT COST 50\\nAS $function$\\n\\tSELECT CASE WHEN public.geometrytype(public.ST\_GeomFromWKB($1, $2)) \= 'POLYGON'\\n\\tTHEN public.ST\_GeomFromWKB($1, $2)\\n\\tELSE NULL END\\n\\t$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_polyfromwkb",  
    "arguments": "bytea",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_polyfromwkb(bytea)\\n RETURNS geometry\\n LANGUAGE sql\\n IMMUTABLE PARALLEL SAFE STRICT COST 50\\nAS $function$\\n\\tSELECT CASE WHEN public.geometrytype(public.ST\_GeomFromWKB($1)) \= 'POLYGON'\\n\\tTHEN public.ST\_GeomFromWKB($1)\\n\\tELSE NULL END\\n\\t$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_polygon",  
    "arguments": "geometry, integer",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_polygon(geometry, integer)\\n RETURNS geometry\\n LANGUAGE sql\\n IMMUTABLE PARALLEL SAFE STRICT COST 50\\nAS $function$\\n\\tSELECT public.ST\_SetSRID(public.ST\_MakePolygon($1), $2)\\n\\t$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_polygonfromtext",  
    "arguments": "text",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_polygonfromtext(text)\\n RETURNS geometry\\n LANGUAGE sql\\n IMMUTABLE PARALLEL SAFE STRICT COST 500\\nAS $function$SELECT public.ST\_PolyFromText($1)$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_polygonfromtext",  
    "arguments": "text, integer",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_polygonfromtext(text, integer)\\n RETURNS geometry\\n LANGUAGE sql\\n IMMUTABLE PARALLEL SAFE STRICT COST 500\\nAS $function$SELECT public.ST\_PolyFromText($1, $2)$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_polygonfromwkb",  
    "arguments": "bytea",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_polygonfromwkb(bytea)\\n RETURNS geometry\\n LANGUAGE sql\\n IMMUTABLE PARALLEL SAFE STRICT COST 50\\nAS $function$\\n\\tSELECT CASE WHEN public.geometrytype(public.ST\_GeomFromWKB($1)) \= 'POLYGON'\\n\\tTHEN public.ST\_GeomFromWKB($1)\\n\\tELSE NULL END\\n\\t$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_polygonfromwkb",  
    "arguments": "bytea, integer",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_polygonfromwkb(bytea, integer)\\n RETURNS geometry\\n LANGUAGE sql\\n IMMUTABLE PARALLEL SAFE STRICT COST 50\\nAS $function$\\n\\tSELECT CASE WHEN public.geometrytype(public.ST\_GeomFromWKB($1,$2)) \= 'POLYGON'\\n\\tTHEN public.ST\_GeomFromWKB($1, $2)\\n\\tELSE NULL END\\n\\t$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_polygonize",  
    "arguments": "geometry\[\]",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_polygonize(geometry\[\])\\n RETURNS geometry\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 10000\\nAS '$libdir/postgis-3', $function$polygonize\_garray$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_project",  
    "arguments": "geog geography, distance double precision, azimuth double precision",  
    "return\_type": "geography",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_project(geog geography, distance double precision, azimuth double precision)\\n RETURNS geography\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE COST 500\\nAS '$libdir/postgis-3', $function$geography\_project$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_quantizecoordinates",  
    "arguments": "g geometry, prec\_x integer, prec\_y integer DEFAULT NULL::integer, prec\_z integer DEFAULT NULL::integer, prec\_m integer DEFAULT NULL::integer",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_quantizecoordinates(g geometry, prec\_x integer, prec\_y integer DEFAULT NULL::integer, prec\_z integer DEFAULT NULL::integer, prec\_m integer DEFAULT NULL::integer)\\n RETURNS geometry\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE COST 500\\nAS '$libdir/postgis-3', $function$ST\_QuantizeCoordinates$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_reduceprecision",  
    "arguments": "geom geometry, gridsize double precision",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_reduceprecision(geom geometry, gridsize double precision)\\n RETURNS geometry\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 500\\nAS '$libdir/postgis-3', $function$ST\_ReducePrecision$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_relate",  
    "arguments": "geom1 geometry, geom2 geometry",  
    "return\_type": "text",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_relate(geom1 geometry, geom2 geometry)\\n RETURNS text\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 10000\\nAS '$libdir/postgis-3', $function$relate\_full$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_relate",  
    "arguments": "geom1 geometry, geom2 geometry, text",  
    "return\_type": "boolean",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_relate(geom1 geometry, geom2 geometry, text)\\n RETURNS boolean\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 10000\\nAS '$libdir/postgis-3', $function$relate\_pattern$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_relate",  
    "arguments": "geom1 geometry, geom2 geometry, integer",  
    "return\_type": "text",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_relate(geom1 geometry, geom2 geometry, integer)\\n RETURNS text\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 10000\\nAS '$libdir/postgis-3', $function$relate\_full$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_relatematch",  
    "arguments": "text, text",  
    "return\_type": "boolean",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_relatematch(text, text)\\n RETURNS boolean\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 500\\nAS '$libdir/postgis-3', $function$ST\_RelateMatch$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_removepoint",  
    "arguments": "geometry, integer",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_removepoint(geometry, integer)\\n RETURNS geometry\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 50\\nAS '$libdir/postgis-3', $function$LWGEOM\_removepoint$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_removerepeatedpoints",  
    "arguments": "geom geometry, tolerance double precision DEFAULT 0.0",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_removerepeatedpoints(geom geometry, tolerance double precision DEFAULT 0.0)\\n RETURNS geometry\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 50\\nAS '$libdir/postgis-3', $function$ST\_RemoveRepeatedPoints$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_reverse",  
    "arguments": "geometry",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_reverse(geometry)\\n RETURNS geometry\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 50\\nAS '$libdir/postgis-3', $function$LWGEOM\_reverse$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_rotate",  
    "arguments": "geometry, double precision",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_rotate(geometry, double precision)\\n RETURNS geometry\\n LANGUAGE sql\\n IMMUTABLE PARALLEL SAFE STRICT COST 50\\nAS $function$SELECT public.ST\_Affine($1,  cos($2), \-sin($2), 0,  sin($2), cos($2), 0,  0, 0, 1,  0, 0, 0)$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_rotate",  
    "arguments": "geometry, double precision, geometry",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_rotate(geometry, double precision, geometry)\\n RETURNS geometry\\n LANGUAGE sql\\n IMMUTABLE PARALLEL SAFE STRICT COST 50\\nAS $function$SELECT public.ST\_Affine($1,  cos($2), \-sin($2), 0,  sin($2),  cos($2), 0, 0, 0, 1, public.ST\_X($3) \- cos($2) \* public.ST\_X($3) \+ sin($2) \* public.ST\_Y($3), public.ST\_Y($3) \- sin($2) \* public.ST\_X($3) \- cos($2) \* public.ST\_Y($3), 0)$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_rotate",  
    "arguments": "geometry, double precision, double precision, double precision",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_rotate(geometry, double precision, double precision, double precision)\\n RETURNS geometry\\n LANGUAGE sql\\n IMMUTABLE PARALLEL SAFE STRICT COST 50\\nAS $function$SELECT public.ST\_Affine($1,  cos($2), \-sin($2), 0,  sin($2),  cos($2), 0, 0, 0, 1,\\t$3 \- cos($2) \* $3 \+ sin($2) \* $4, $4 \- sin($2) \* $3 \- cos($2) \* $4, 0)$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_rotatex",  
    "arguments": "geometry, double precision",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_rotatex(geometry, double precision)\\n RETURNS geometry\\n LANGUAGE sql\\n IMMUTABLE PARALLEL SAFE STRICT COST 50\\nAS $function$SELECT public.ST\_Affine($1, 1, 0, 0, 0, cos($2), \-sin($2), 0, sin($2), cos($2), 0, 0, 0)$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_rotatey",  
    "arguments": "geometry, double precision",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_rotatey(geometry, double precision)\\n RETURNS geometry\\n LANGUAGE sql\\n IMMUTABLE PARALLEL SAFE STRICT COST 50\\nAS $function$SELECT public.ST\_Affine($1,  cos($2), 0, sin($2),  0, 1, 0,  \-sin($2), 0, cos($2), 0,  0, 0)$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_rotatez",  
    "arguments": "geometry, double precision",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_rotatez(geometry, double precision)\\n RETURNS geometry\\n LANGUAGE sql\\n IMMUTABLE PARALLEL SAFE STRICT COST 50\\nAS $function$SELECT public.ST\_Rotate($1, $2)$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_scale",  
    "arguments": "geometry, geometry",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_scale(geometry, geometry)\\n RETURNS geometry\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 50\\nAS '$libdir/postgis-3', $function$ST\_Scale$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_scale",  
    "arguments": "geometry, geometry, origin geometry",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_scale(geometry, geometry, origin geometry)\\n RETURNS geometry\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 50\\nAS '$libdir/postgis-3', $function$ST\_Scale$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_scale",  
    "arguments": "geometry, double precision, double precision, double precision",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_scale(geometry, double precision, double precision, double precision)\\n RETURNS geometry\\n LANGUAGE sql\\n IMMUTABLE PARALLEL SAFE STRICT COST 50\\nAS $function$SELECT public.ST\_Scale($1, public.ST\_MakePoint($2, $3, $4))$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_scale",  
    "arguments": "geometry, double precision, double precision",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_scale(geometry, double precision, double precision)\\n RETURNS geometry\\n LANGUAGE sql\\n IMMUTABLE PARALLEL SAFE STRICT COST 50\\nAS $function$SELECT public.ST\_Scale($1, $2, $3, 1)$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_scroll",  
    "arguments": "geometry, geometry",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_scroll(geometry, geometry)\\n RETURNS geometry\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 50\\nAS '$libdir/postgis-3', $function$ST\_Scroll$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_segmentize",  
    "arguments": "geog geography, max\_segment\_length double precision",  
    "return\_type": "geography",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_segmentize(geog geography, max\_segment\_length double precision)\\n RETURNS geography\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 500\\nAS '$libdir/postgis-3', $function$geography\_segmentize$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_segmentize",  
    "arguments": "geometry, double precision",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_segmentize(geometry, double precision)\\n RETURNS geometry\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 500\\nAS '$libdir/postgis-3', $function$LWGEOM\_segmentize2d$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_seteffectivearea",  
    "arguments": "geometry, double precision DEFAULT '-1'::integer, integer DEFAULT 1",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_seteffectivearea(geometry, double precision DEFAULT '-1'::integer, integer DEFAULT 1)\\n RETURNS geometry\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 10000\\nAS '$libdir/postgis-3', $function$LWGEOM\_SetEffectiveArea$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_setpoint",  
    "arguments": "geometry, integer, geometry",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_setpoint(geometry, integer, geometry)\\n RETURNS geometry\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 50\\nAS '$libdir/postgis-3', $function$LWGEOM\_setpoint\_linestring$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_setsrid",  
    "arguments": "geog geography, srid integer",  
    "return\_type": "geography",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_setsrid(geog geography, srid integer)\\n RETURNS geography\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 50\\nAS '$libdir/postgis-3', $function$LWGEOM\_set\_srid$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_setsrid",  
    "arguments": "geom geometry, srid integer",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_setsrid(geom geometry, srid integer)\\n RETURNS geometry\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/postgis-3', $function$LWGEOM\_set\_srid$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_sharedpaths",  
    "arguments": "geom1 geometry, geom2 geometry",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_sharedpaths(geom1 geometry, geom2 geometry)\\n RETURNS geometry\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 10000\\nAS '$libdir/postgis-3', $function$ST\_SharedPaths$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_shiftlongitude",  
    "arguments": "geometry",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_shiftlongitude(geometry)\\n RETURNS geometry\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 50\\nAS '$libdir/postgis-3', $function$LWGEOM\_longitude\_shift$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_shortestline",  
    "arguments": "geom1 geometry, geom2 geometry",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_shortestline(geom1 geometry, geom2 geometry)\\n RETURNS geometry\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 500\\nAS '$libdir/postgis-3', $function$LWGEOM\_shortestline2d$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_simplify",  
    "arguments": "geometry, double precision, boolean",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_simplify(geometry, double precision, boolean)\\n RETURNS geometry\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 50\\nAS '$libdir/postgis-3', $function$LWGEOM\_simplify2d$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_simplify",  
    "arguments": "geometry, double precision",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_simplify(geometry, double precision)\\n RETURNS geometry\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 50\\nAS '$libdir/postgis-3', $function$LWGEOM\_simplify2d$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_simplifypolygonhull",  
    "arguments": "geom geometry, vertex\_fraction double precision, is\_outer boolean DEFAULT true",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_simplifypolygonhull(geom geometry, vertex\_fraction double precision, is\_outer boolean DEFAULT true)\\n RETURNS geometry\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 10000\\nAS '$libdir/postgis-3', $function$ST\_SimplifyPolygonHull$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_simplifypreservetopology",  
    "arguments": "geometry, double precision",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_simplifypreservetopology(geometry, double precision)\\n RETURNS geometry\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 10000\\nAS '$libdir/postgis-3', $function$topologypreservesimplify$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_simplifyvw",  
    "arguments": "geometry, double precision",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_simplifyvw(geometry, double precision)\\n RETURNS geometry\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 10000\\nAS '$libdir/postgis-3', $function$LWGEOM\_SetEffectiveArea$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_snap",  
    "arguments": "geom1 geometry, geom2 geometry, double precision",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_snap(geom1 geometry, geom2 geometry, double precision)\\n RETURNS geometry\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 10000\\nAS '$libdir/postgis-3', $function$ST\_Snap$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_snaptogrid",  
    "arguments": "geometry, double precision, double precision",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_snaptogrid(geometry, double precision, double precision)\\n RETURNS geometry\\n LANGUAGE sql\\n IMMUTABLE PARALLEL SAFE STRICT COST 50\\nAS $function$SELECT public.ST\_SnapToGrid($1, 0, 0, $2, $3)$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_snaptogrid",  
    "arguments": "geom1 geometry, geom2 geometry, double precision, double precision, double precision, double precision",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_snaptogrid(geom1 geometry, geom2 geometry, double precision, double precision, double precision, double precision)\\n RETURNS geometry\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 50\\nAS '$libdir/postgis-3', $function$LWGEOM\_snaptogrid\_pointoff$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_snaptogrid",  
    "arguments": "geometry, double precision",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_snaptogrid(geometry, double precision)\\n RETURNS geometry\\n LANGUAGE sql\\n IMMUTABLE PARALLEL SAFE STRICT COST 50\\nAS $function$SELECT public.ST\_SnapToGrid($1, 0, 0, $2, $2)$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_snaptogrid",  
    "arguments": "geometry, double precision, double precision, double precision, double precision",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_snaptogrid(geometry, double precision, double precision, double precision, double precision)\\n RETURNS geometry\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 50\\nAS '$libdir/postgis-3', $function$LWGEOM\_snaptogrid$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_split",  
    "arguments": "geom1 geometry, geom2 geometry",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_split(geom1 geometry, geom2 geometry)\\n RETURNS geometry\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 10000\\nAS '$libdir/postgis-3', $function$ST\_Split$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_square",  
    "arguments": "size double precision, cell\_i integer, cell\_j integer, origin geometry DEFAULT '010100000000000000000000000000000000000000'::geometry",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_square(size double precision, cell\_i integer, cell\_j integer, origin geometry DEFAULT '010100000000000000000000000000000000000000'::geometry)\\n RETURNS geometry\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 50\\nAS '$libdir/postgis-3', $function$ST\_Square$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_squaregrid",  
    "arguments": "size double precision, bounds geometry, OUT geom geometry, OUT i integer, OUT j integer",  
    "return\_type": "SETOF record",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_squaregrid(size double precision, bounds geometry, OUT geom geometry, OUT i integer, OUT j integer)\\n RETURNS SETOF record\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 500\\nAS '$libdir/postgis-3', $function$ST\_ShapeGrid$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_srid",  
    "arguments": "geom geometry",  
    "return\_type": "integer",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_srid(geom geometry)\\n RETURNS integer\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/postgis-3', $function$LWGEOM\_get\_srid$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_srid",  
    "arguments": "geog geography",  
    "return\_type": "integer",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_srid(geog geography)\\n RETURNS integer\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 50\\nAS '$libdir/postgis-3', $function$LWGEOM\_get\_srid$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_startpoint",  
    "arguments": "geometry",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_startpoint(geometry)\\n RETURNS geometry\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 50\\nAS '$libdir/postgis-3', $function$LWGEOM\_startpoint\_linestring$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_subdivide",  
    "arguments": "geom geometry, maxvertices integer DEFAULT 256, gridsize double precision DEFAULT '-1.0'::numeric",  
    "return\_type": "SETOF geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_subdivide(geom geometry, maxvertices integer DEFAULT 256, gridsize double precision DEFAULT '-1.0'::numeric)\\n RETURNS SETOF geometry\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 10000\\nAS '$libdir/postgis-3', $function$ST\_Subdivide$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_summary",  
    "arguments": "geography",  
    "return\_type": "text",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_summary(geography)\\n RETURNS text\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 50\\nAS '$libdir/postgis-3', $function$LWGEOM\_summary$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_summary",  
    "arguments": "geometry",  
    "return\_type": "text",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_summary(geometry)\\n RETURNS text\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 50\\nAS '$libdir/postgis-3', $function$LWGEOM\_summary$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_swapordinates",  
    "arguments": "geom geometry, ords cstring",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_swapordinates(geom geometry, ords cstring)\\n RETURNS geometry\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 50\\nAS '$libdir/postgis-3', $function$ST\_SwapOrdinates$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_symdifference",  
    "arguments": "geom1 geometry, geom2 geometry, gridsize double precision DEFAULT '-1.0'::numeric",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_symdifference(geom1 geometry, geom2 geometry, gridsize double precision DEFAULT '-1.0'::numeric)\\n RETURNS geometry\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 10000\\nAS '$libdir/postgis-3', $function$ST\_SymDifference$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_symmetricdifference",  
    "arguments": "geom1 geometry, geom2 geometry",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_symmetricdifference(geom1 geometry, geom2 geometry)\\n RETURNS geometry\\n LANGUAGE sql\\nAS $function$SELECT ST\_SymDifference(geom1, geom2, \-1.0);$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_tileenvelope",  
    "arguments": "zoom integer, x integer, y integer, bounds geometry DEFAULT '0102000020110F00000200000093107C45F81B73C193107C45F81B73C193107C45F81B734193107C45F81B7341'::geometry, margin double precision DEFAULT 0.0",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_tileenvelope(zoom integer, x integer, y integer, bounds geometry DEFAULT '0102000020110F00000200000093107C45F81B73C193107C45F81B73C193107C45F81B734193107C45F81B7341'::geometry, margin double precision DEFAULT 0.0)\\n RETURNS geometry\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 50\\nAS '$libdir/postgis-3', $function$ST\_TileEnvelope$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_touches",  
    "arguments": "geom1 geometry, geom2 geometry",  
    "return\_type": "boolean",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_touches(geom1 geometry, geom2 geometry)\\n RETURNS boolean\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 10000 SUPPORT postgis\_index\_supportfn\\nAS '$libdir/postgis-3', $function$touches$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_transform",  
    "arguments": "geometry, integer",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_transform(geometry, integer)\\n RETURNS geometry\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 10000\\nAS '$libdir/postgis-3', $function$transform$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_transform",  
    "arguments": "geom geometry, to\_proj text",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_transform(geom geometry, to\_proj text)\\n RETURNS geometry\\n LANGUAGE sql\\n IMMUTABLE PARALLEL SAFE STRICT COST 10000\\nAS $function$SELECT public.postgis\_transform\_geometry($1, proj4text, $2, 0)\\n\\tFROM spatial\_ref\_sys WHERE srid=public.ST\_SRID($1);$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_transform",  
    "arguments": "geom geometry, from\_proj text, to\_proj text",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_transform(geom geometry, from\_proj text, to\_proj text)\\n RETURNS geometry\\n LANGUAGE sql\\n IMMUTABLE PARALLEL SAFE STRICT COST 10000\\nAS $function$SELECT public.postgis\_transform\_geometry($1, $2, $3, 0)$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_transform",  
    "arguments": "geom geometry, from\_proj text, to\_srid integer",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_transform(geom geometry, from\_proj text, to\_srid integer)\\n RETURNS geometry\\n LANGUAGE sql\\n IMMUTABLE PARALLEL SAFE STRICT COST 10000\\nAS $function$SELECT public.postgis\_transform\_geometry($1, $2, proj4text, $3)\\n\\tFROM spatial\_ref\_sys WHERE srid=$3;$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_translate",  
    "arguments": "geometry, double precision, double precision",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_translate(geometry, double precision, double precision)\\n RETURNS geometry\\n LANGUAGE sql\\n IMMUTABLE PARALLEL SAFE STRICT COST 50\\nAS $function$SELECT public.ST\_Translate($1, $2, $3, 0)$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_translate",  
    "arguments": "geometry, double precision, double precision, double precision",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_translate(geometry, double precision, double precision, double precision)\\n RETURNS geometry\\n LANGUAGE sql\\n IMMUTABLE PARALLEL SAFE STRICT COST 50\\nAS $function$SELECT public.ST\_Affine($1, 1, 0, 0, 0, 1, 0, 0, 0, 1, $2, $3, $4)$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_transscale",  
    "arguments": "geometry, double precision, double precision, double precision, double precision",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_transscale(geometry, double precision, double precision, double precision, double precision)\\n RETURNS geometry\\n LANGUAGE sql\\n IMMUTABLE PARALLEL SAFE STRICT COST 50\\nAS $function$SELECT public.ST\_Affine($1,  $4, 0, 0,  0, $5, 0,\\n\\t\\t0, 0, 1,  $2 \* $4, $3 \* $5, 0)$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_triangulatepolygon",  
    "arguments": "g1 geometry",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_triangulatepolygon(g1 geometry)\\n RETURNS geometry\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 10000\\nAS '$libdir/postgis-3', $function$ST\_TriangulatePolygon$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_unaryunion",  
    "arguments": "geometry, gridsize double precision DEFAULT '-1.0'::numeric",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_unaryunion(geometry, gridsize double precision DEFAULT '-1.0'::numeric)\\n RETURNS geometry\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 10000\\nAS '$libdir/postgis-3', $function$ST\_UnaryUnion$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_union",  
    "arguments": "geom1 geometry, geom2 geometry",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_union(geom1 geometry, geom2 geometry)\\n RETURNS geometry\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 10000\\nAS '$libdir/postgis-3', $function$ST\_Union$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_union",  
    "arguments": "geometry\[\]",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_union(geometry\[\])\\n RETURNS geometry\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 10000\\nAS '$libdir/postgis-3', $function$pgis\_union\_geometry\_array$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_union",  
    "arguments": "geom1 geometry, geom2 geometry, gridsize double precision",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_union(geom1 geometry, geom2 geometry, gridsize double precision)\\n RETURNS geometry\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 10000\\nAS '$libdir/postgis-3', $function$ST\_Union$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_voronoilines",  
    "arguments": "g1 geometry, tolerance double precision DEFAULT 0.0, extend\_to geometry DEFAULT NULL::geometry",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_voronoilines(g1 geometry, tolerance double precision DEFAULT 0.0, extend\_to geometry DEFAULT NULL::geometry)\\n RETURNS geometry\\n LANGUAGE sql\\n IMMUTABLE PARALLEL SAFE\\nAS $function$ SELECT public.\_ST\_Voronoi(g1, extend\_to, tolerance, false) $function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_voronoipolygons",  
    "arguments": "g1 geometry, tolerance double precision DEFAULT 0.0, extend\_to geometry DEFAULT NULL::geometry",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_voronoipolygons(g1 geometry, tolerance double precision DEFAULT 0.0, extend\_to geometry DEFAULT NULL::geometry)\\n RETURNS geometry\\n LANGUAGE sql\\n IMMUTABLE PARALLEL SAFE\\nAS $function$ SELECT public.\_ST\_Voronoi(g1, extend\_to, tolerance, true) $function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_within",  
    "arguments": "geom1 geometry, geom2 geometry",  
    "return\_type": "boolean",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_within(geom1 geometry, geom2 geometry)\\n RETURNS boolean\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 10000 SUPPORT postgis\_index\_supportfn\\nAS '$libdir/postgis-3', $function$within$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_wkbtosql",  
    "arguments": "wkb bytea",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_wkbtosql(wkb bytea)\\n RETURNS geometry\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 50\\nAS '$libdir/postgis-3', $function$LWGEOM\_from\_WKB$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_wkttosql",  
    "arguments": "text",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_wkttosql(text)\\n RETURNS geometry\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 500\\nAS '$libdir/postgis-3', $function$LWGEOM\_from\_text$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_wrapx",  
    "arguments": "geom geometry, wrap double precision, move double precision",  
    "return\_type": "geometry",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_wrapx(geom geometry, wrap double precision, move double precision)\\n RETURNS geometry\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 50\\nAS '$libdir/postgis-3', $function$ST\_WrapX$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_x",  
    "arguments": "geometry",  
    "return\_type": "double precision",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_x(geometry)\\n RETURNS double precision\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/postgis-3', $function$LWGEOM\_x\_point$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_xmax",  
    "arguments": "box3d",  
    "return\_type": "double precision",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_xmax(box3d)\\n RETURNS double precision\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/postgis-3', $function$BOX3D\_xmax$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_xmin",  
    "arguments": "box3d",  
    "return\_type": "double precision",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_xmin(box3d)\\n RETURNS double precision\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/postgis-3', $function$BOX3D\_xmin$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_y",  
    "arguments": "geometry",  
    "return\_type": "double precision",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_y(geometry)\\n RETURNS double precision\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/postgis-3', $function$LWGEOM\_y\_point$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_ymax",  
    "arguments": "box3d",  
    "return\_type": "double precision",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_ymax(box3d)\\n RETURNS double precision\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/postgis-3', $function$BOX3D\_ymax$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_ymin",  
    "arguments": "box3d",  
    "return\_type": "double precision",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_ymin(box3d)\\n RETURNS double precision\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/postgis-3', $function$BOX3D\_ymin$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_z",  
    "arguments": "geometry",  
    "return\_type": "double precision",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_z(geometry)\\n RETURNS double precision\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/postgis-3', $function$LWGEOM\_z\_point$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_zmax",  
    "arguments": "box3d",  
    "return\_type": "double precision",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_zmax(box3d)\\n RETURNS double precision\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/postgis-3', $function$BOX3D\_zmax$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_zmflag",  
    "arguments": "geometry",  
    "return\_type": "smallint",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_zmflag(geometry)\\n RETURNS smallint\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/postgis-3', $function$LWGEOM\_zmflag$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "st\_zmin",  
    "arguments": "box3d",  
    "return\_type": "double precision",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.st\_zmin(box3d)\\n RETURNS double precision\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/postgis-3', $function$BOX3D\_zmin$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "subvector",  
    "arguments": "halfvec, integer, integer",  
    "return\_type": "halfvec",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.subvector(halfvec, integer, integer)\\n RETURNS halfvec\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/vector', $function$halfvec\_subvector$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "subvector",  
    "arguments": "vector, integer, integer",  
    "return\_type": "vector",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.subvector(vector, integer, integer)\\n RETURNS vector\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/vector', $function$subvector$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "text",  
    "arguments": "geometry",  
    "return\_type": "text",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.text(geometry)\\n RETURNS text\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT COST 50\\nAS '$libdir/postgis-3', $function$LWGEOM\_to\_text$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "unlockrows",  
    "arguments": "text",  
    "return\_type": "integer",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.unlockrows(text)\\n RETURNS integer\\n LANGUAGE plpgsql\\n STRICT\\nAS $function$\\nDECLARE\\n\\tret int;\\nBEGIN\\n\\n\\tIF NOT LongTransactionsEnabled() THEN\\n\\t\\tRAISE EXCEPTION 'Long transaction support disabled, use EnableLongTransaction() to enable.';\\n\\tEND IF;\\n\\n\\tEXECUTE 'DELETE FROM authorization\_table where authid \= ' ||\\n\\t\\tquote\_literal($1);\\n\\n\\tGET DIAGNOSTICS ret \= ROW\_COUNT;\\n\\n\\tRETURN ret;\\nEND;\\n$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "update\_restaurant\_product\_preferences\_updated\_at",  
    "arguments": "",  
    "return\_type": "trigger",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.update\_restaurant\_product\_preferences\_updated\_at()\\n RETURNS trigger\\n LANGUAGE plpgsql\\nAS $function$\\nBEGIN\\n  NEW.updated\_at \= now();\\n  RETURN NEW;\\nEND;\\n$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "update\_updated\_at\_column",  
    "arguments": "",  
    "return\_type": "trigger",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.update\_updated\_at\_column()\\n RETURNS trigger\\n LANGUAGE plpgsql\\nAS $function$\\nBEGIN\\n    NEW.updated\_at \= NOW();\\n    RETURN NEW;\\nEND;\\n$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "updategeometrysrid",  
    "arguments": "catalogn\_name character varying, schema\_name character varying, table\_name character varying, column\_name character varying, new\_srid\_in integer",  
    "return\_type": "text",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.updategeometrysrid(catalogn\_name character varying, schema\_name character varying, table\_name character varying, column\_name character varying, new\_srid\_in integer)\\n RETURNS text\\n LANGUAGE plpgsql\\n STRICT\\nAS $function$\\nDECLARE\\n\\tmyrec RECORD;\\n\\tokay boolean;\\n\\tcname varchar;\\n\\treal\_schema name;\\n\\tunknown\_srid integer;\\n\\tnew\_srid integer := new\_srid\_in;\\n\\nBEGIN\\n\\n\\t-- Find, check or fix schema\_name\\n\\tIF ( schema\_name \!= '' ) THEN\\n\\t\\tokay \= false;\\n\\n\\t\\tFOR myrec IN SELECT nspname FROM pg\_namespace WHERE text(nspname) \= schema\_name LOOP\\n\\t\\t\\tokay := true;\\n\\t\\tEND LOOP;\\n\\n\\t\\tIF ( okay \<\> true ) THEN\\n\\t\\t\\tRAISE EXCEPTION 'Invalid schema name';\\n\\t\\tELSE\\n\\t\\t\\treal\_schema \= schema\_name;\\n\\t\\tEND IF;\\n\\tELSE\\n\\t\\tSELECT INTO real\_schema current\_schema()::text;\\n\\tEND IF;\\n\\n\\t-- Ensure that column\_name is in geometry\_columns\\n\\tokay \= false;\\n\\tFOR myrec IN SELECT type, coord\_dimension FROM public.geometry\_columns WHERE f\_table\_schema \= text(real\_schema) and f\_table\_name \= table\_name and f\_geometry\_column \= column\_name LOOP\\n\\t\\tokay := true;\\n\\tEND LOOP;\\n\\tIF (NOT okay) THEN\\n\\t\\tRAISE EXCEPTION 'column not found in geometry\_columns table';\\n\\t\\tRETURN false;\\n\\tEND IF;\\n\\n\\t-- Ensure that new\_srid is valid\\n\\tIF ( new\_srid \> 0 ) THEN\\n\\t\\tIF ( SELECT count(\*) \= 0 from spatial\_ref\_sys where srid \= new\_srid ) THEN\\n\\t\\t\\tRAISE EXCEPTION 'invalid SRID: % not found in spatial\_ref\_sys', new\_srid;\\n\\t\\t\\tRETURN false;\\n\\t\\tEND IF;\\n\\tELSE\\n\\t\\tunknown\_srid := public.ST\_SRID('POINT EMPTY'::public.geometry);\\n\\t\\tIF ( new\_srid \!= unknown\_srid ) THEN\\n\\t\\t\\tnew\_srid := unknown\_srid;\\n\\t\\t\\tRAISE NOTICE 'SRID value % converted to the officially unknown SRID value %', new\_srid\_in, new\_srid;\\n\\t\\tEND IF;\\n\\tEND IF;\\n\\n\\tIF postgis\_constraint\_srid(real\_schema, table\_name, column\_name) IS NOT NULL THEN\\n\\t-- srid was enforced with constraints before, keep it that way.\\n\\t\\t-- Make up constraint name\\n\\t\\tcname \= 'enforce\_srid\_'  || column\_name;\\n\\n\\t\\t-- Drop enforce\_srid constraint\\n\\t\\tEXECUTE 'ALTER TABLE ' || quote\_ident(real\_schema) ||\\n\\t\\t\\t'.' || quote\_ident(table\_name) ||\\n\\t\\t\\t' DROP constraint ' || quote\_ident(cname);\\n\\n\\t\\t-- Update geometries SRID\\n\\t\\tEXECUTE 'UPDATE ' || quote\_ident(real\_schema) ||\\n\\t\\t\\t'.' || quote\_ident(table\_name) ||\\n\\t\\t\\t' SET ' || quote\_ident(column\_name) ||\\n\\t\\t\\t' \= public.ST\_SetSRID(' || quote\_ident(column\_name) ||\\n\\t\\t\\t', ' || new\_srid::text || ')';\\n\\n\\t\\t-- Reset enforce\_srid constraint\\n\\t\\tEXECUTE 'ALTER TABLE ' || quote\_ident(real\_schema) ||\\n\\t\\t\\t'.' || quote\_ident(table\_name) ||\\n\\t\\t\\t' ADD constraint ' || quote\_ident(cname) ||\\n\\t\\t\\t' CHECK (st\_srid(' || quote\_ident(column\_name) ||\\n\\t\\t\\t') \= ' || new\_srid::text || ')';\\n\\tELSE\\n\\t\\t-- We will use typmod to enforce if no srid constraints\\n\\t\\t-- We are using postgis\_type\_name to lookup the new name\\n\\t\\t-- (in case Paul changes his mind and flips geometry\_columns to return old upper case name)\\n\\t\\tEXECUTE 'ALTER TABLE ' || quote\_ident(real\_schema) || '.' || quote\_ident(table\_name) ||\\n\\t\\t' ALTER COLUMN ' || quote\_ident(column\_name) || ' TYPE  geometry(' || public.postgis\_type\_name(myrec.type, myrec.coord\_dimension, true) || ', ' || new\_srid::text || ') USING public.ST\_SetSRID(' || quote\_ident(column\_name) || ',' || new\_srid::text || ');' ;\\n\\tEND IF;\\n\\n\\tRETURN real\_schema || '.' || table\_name || '.' || column\_name ||' SRID changed to ' || new\_srid::text;\\n\\nEND;\\n$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "updategeometrysrid",  
    "arguments": "character varying, character varying, integer",  
    "return\_type": "text",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.updategeometrysrid(character varying, character varying, integer)\\n RETURNS text\\n LANGUAGE plpgsql\\n STRICT\\nAS $function$\\nDECLARE\\n\\tret  text;\\nBEGIN\\n\\tSELECT public.UpdateGeometrySRID('','',$1,$2,$3) into ret;\\n\\tRETURN ret;\\nEND;\\n$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "updategeometrysrid",  
    "arguments": "character varying, character varying, character varying, integer",  
    "return\_type": "text",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.updategeometrysrid(character varying, character varying, character varying, integer)\\n RETURNS text\\n LANGUAGE plpgsql\\n STRICT\\nAS $function$\\nDECLARE\\n\\tret  text;\\nBEGIN\\n\\tSELECT public.UpdateGeometrySRID('',$1,$2,$3,$4) into ret;\\n\\tRETURN ret;\\nEND;\\n$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "vector",  
    "arguments": "vector, integer, boolean",  
    "return\_type": "vector",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.vector(vector, integer, boolean)\\n RETURNS vector\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/vector', $function$vector$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "vector\_accum",  
    "arguments": "double precision\[\], vector",  
    "return\_type": "double precision\[\]",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.vector\_accum(double precision\[\], vector)\\n RETURNS double precision\[\]\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/vector', $function$vector\_accum$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "vector\_add",  
    "arguments": "vector, vector",  
    "return\_type": "vector",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.vector\_add(vector, vector)\\n RETURNS vector\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/vector', $function$vector\_add$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "vector\_avg",  
    "arguments": "double precision\[\]",  
    "return\_type": "vector",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.vector\_avg(double precision\[\])\\n RETURNS vector\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/vector', $function$vector\_avg$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "vector\_cmp",  
    "arguments": "vector, vector",  
    "return\_type": "integer",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.vector\_cmp(vector, vector)\\n RETURNS integer\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/vector', $function$vector\_cmp$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "vector\_combine",  
    "arguments": "double precision\[\], double precision\[\]",  
    "return\_type": "double precision\[\]",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.vector\_combine(double precision\[\], double precision\[\])\\n RETURNS double precision\[\]\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/vector', $function$vector\_combine$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "vector\_concat",  
    "arguments": "vector, vector",  
    "return\_type": "vector",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.vector\_concat(vector, vector)\\n RETURNS vector\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/vector', $function$vector\_concat$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "vector\_dims",  
    "arguments": "vector",  
    "return\_type": "integer",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.vector\_dims(vector)\\n RETURNS integer\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/vector', $function$vector\_dims$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "vector\_dims",  
    "arguments": "halfvec",  
    "return\_type": "integer",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.vector\_dims(halfvec)\\n RETURNS integer\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/vector', $function$halfvec\_vector\_dims$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "vector\_eq",  
    "arguments": "vector, vector",  
    "return\_type": "boolean",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.vector\_eq(vector, vector)\\n RETURNS boolean\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/vector', $function$vector\_eq$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "vector\_ge",  
    "arguments": "vector, vector",  
    "return\_type": "boolean",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.vector\_ge(vector, vector)\\n RETURNS boolean\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/vector', $function$vector\_ge$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "vector\_gt",  
    "arguments": "vector, vector",  
    "return\_type": "boolean",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.vector\_gt(vector, vector)\\n RETURNS boolean\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/vector', $function$vector\_gt$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "vector\_in",  
    "arguments": "cstring, oid, integer",  
    "return\_type": "vector",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.vector\_in(cstring, oid, integer)\\n RETURNS vector\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/vector', $function$vector\_in$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "vector\_l2\_squared\_distance",  
    "arguments": "vector, vector",  
    "return\_type": "double precision",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.vector\_l2\_squared\_distance(vector, vector)\\n RETURNS double precision\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/vector', $function$vector\_l2\_squared\_distance$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "vector\_le",  
    "arguments": "vector, vector",  
    "return\_type": "boolean",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.vector\_le(vector, vector)\\n RETURNS boolean\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/vector', $function$vector\_le$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "vector\_lt",  
    "arguments": "vector, vector",  
    "return\_type": "boolean",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.vector\_lt(vector, vector)\\n RETURNS boolean\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/vector', $function$vector\_lt$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "vector\_mul",  
    "arguments": "vector, vector",  
    "return\_type": "vector",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.vector\_mul(vector, vector)\\n RETURNS vector\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/vector', $function$vector\_mul$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "vector\_ne",  
    "arguments": "vector, vector",  
    "return\_type": "boolean",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.vector\_ne(vector, vector)\\n RETURNS boolean\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/vector', $function$vector\_ne$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "vector\_negative\_inner\_product",  
    "arguments": "vector, vector",  
    "return\_type": "double precision",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.vector\_negative\_inner\_product(vector, vector)\\n RETURNS double precision\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/vector', $function$vector\_negative\_inner\_product$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "vector\_norm",  
    "arguments": "vector",  
    "return\_type": "double precision",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.vector\_norm(vector)\\n RETURNS double precision\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/vector', $function$vector\_norm$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "vector\_out",  
    "arguments": "vector",  
    "return\_type": "cstring",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.vector\_out(vector)\\n RETURNS cstring\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/vector', $function$vector\_out$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "vector\_recv",  
    "arguments": "internal, oid, integer",  
    "return\_type": "vector",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.vector\_recv(internal, oid, integer)\\n RETURNS vector\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/vector', $function$vector\_recv$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "vector\_search",  
    "arguments": "query\_embedding vector, search\_term text DEFAULT ''::text, match\_count integer DEFAULT 10",  
    "return\_type": "TABLE(id bigint, product\_name text, similarity\_distance double precision)",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.vector\_search(query\_embedding vector, search\_term text DEFAULT ''::text, match\_count integer DEFAULT 10)\\n RETURNS TABLE(id bigint, product\_name text, similarity\_distance double precision)\\n LANGUAGE plpgsql\\n SECURITY DEFINER\\nAS $function$\\nBEGIN\\n  RETURN QUERY\\n  SELECT \\n    ml.id,\\n    ml.product\_name::text,\\n    (ml.embedding\_vector\_v2 \<=\> query\_embedding)::float as similarity\_distance\\n  FROM master\_list ml\\n  WHERE ml.is\_active \= true \\n    AND ml.embedding\_vector\_v2 IS NOT NULL\\n    AND (\\n      search\_term \= '' OR\\n      ml.product\_name ILIKE '%' || search\_term || '%'\\n    )\\n  ORDER BY similarity\_distance ASC\\n  LIMIT match\_count;\\nEND;\\n$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "vector\_send",  
    "arguments": "vector",  
    "return\_type": "bytea",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.vector\_send(vector)\\n RETURNS bytea\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/vector', $function$vector\_send$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "vector\_spherical\_distance",  
    "arguments": "vector, vector",  
    "return\_type": "double precision",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.vector\_spherical\_distance(vector, vector)\\n RETURNS double precision\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/vector', $function$vector\_spherical\_distance$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "vector\_sub",  
    "arguments": "vector, vector",  
    "return\_type": "vector",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.vector\_sub(vector, vector)\\n RETURNS vector\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/vector', $function$vector\_sub$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "vector\_to\_float4",  
    "arguments": "vector, integer, boolean",  
    "return\_type": "real\[\]",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.vector\_to\_float4(vector, integer, boolean)\\n RETURNS real\[\]\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/vector', $function$vector\_to\_float4$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "vector\_to\_halfvec",  
    "arguments": "vector, integer, boolean",  
    "return\_type": "halfvec",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.vector\_to\_halfvec(vector, integer, boolean)\\n RETURNS halfvec\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/vector', $function$vector\_to\_halfvec$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "vector\_to\_sparsevec",  
    "arguments": "vector, integer, boolean",  
    "return\_type": "sparsevec",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.vector\_to\_sparsevec(vector, integer, boolean)\\n RETURNS sparsevec\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/vector', $function$vector\_to\_sparsevec$function$\\n"  
  },  
  {  
    "schema": "public",  
    "function\_name": "vector\_typmod\_in",  
    "arguments": "cstring\[\]",  
    "return\_type": "integer",  
    "function\_type": "function",  
    "definition": "CREATE OR REPLACE FUNCTION public.vector\_typmod\_in(cstring\[\])\\n RETURNS integer\\n LANGUAGE c\\n IMMUTABLE PARALLEL SAFE STRICT\\nAS '$libdir/vector', $function$vector\_typmod\_in$function$\\n"  
  }  
\]

### **8\. Policies RLS (Row Level Security)**

\[  
  {  
    "schemaname": "public",  
    "tablename": "line\_sessions",  
    "policyname": "Allow authenticated read access",  
    "permissive": "PERMISSIVE",  
    "roles": "{authenticated}",  
    "command": "SELECT",  
    "using\_expression": "true",  
    "with\_check\_expression": null  
  },  
  {  
    "schemaname": "public",  
    "tablename": "master\_list",  
    "policyname": "Allow authenticated read access",  
    "permissive": "PERMISSIVE",  
    "roles": "{authenticated}",  
    "command": "SELECT",  
    "using\_expression": "true",  
    "with\_check\_expression": null  
  },  
  {  
    "schemaname": "public",  
    "tablename": "pricing\_history",  
    "policyname": "Allow authenticated read access",  
    "permissive": "PERMISSIVE",  
    "roles": "{authenticated}",  
    "command": "SELECT",  
    "using\_expression": "true",  
    "with\_check\_expression": null  
  },  
  {  
    "schemaname": "public",  
    "tablename": "product\_categories",  
    "policyname": "Allow authenticated read access",  
    "permissive": "PERMISSIVE",  
    "roles": "{authenticated}",  
    "command": "SELECT",  
    "using\_expression": "true",  
    "with\_check\_expression": null  
  },  
  {  
    "schemaname": "public",  
    "tablename": "purchase\_orders",  
    "policyname": "Allow authenticated read access",  
    "permissive": "PERMISSIVE",  
    "roles": "{authenticated}",  
    "command": "SELECT",  
    "using\_expression": "true",  
    "with\_check\_expression": null  
  },  
  {  
    "schemaname": "public",  
    "tablename": "restaurant\_people",  
    "policyname": "Allow authenticated read access",  
    "permissive": "PERMISSIVE",  
    "roles": "{authenticated}",  
    "command": "SELECT",  
    "using\_expression": "true",  
    "with\_check\_expression": null  
  },  
  {  
    "schemaname": "public",  
    "tablename": "restaurants",  
    "policyname": "Allow authenticated read access",  
    "permissive": "PERMISSIVE",  
    "roles": "{authenticated}",  
    "command": "SELECT",  
    "using\_expression": "true",  
    "with\_check\_expression": null  
  },  
  {  
    "schemaname": "public",  
    "tablename": "supplier\_mapped\_products",  
    "policyname": "Allow authenticated read access",  
    "permissive": "PERMISSIVE",  
    "roles": "{authenticated}",  
    "command": "SELECT",  
    "using\_expression": "true",  
    "with\_check\_expression": null  
  },  
  {  
    "schemaname": "public",  
    "tablename": "suppliers",  
    "policyname": "Allow authenticated read access",  
    "permissive": "PERMISSIVE",  
    "roles": "{authenticated}",  
    "command": "SELECT",  
    "using\_expression": "true",  
    "with\_check\_expression": null  
  }  
\]

### **9\. Extensiones Habilitadas**

\[  
  {  
    "extension\_name": "pg\_graphql",  
    "version": "1.5.11",  
    "relocatable": false  
  },  
  {  
    "extension\_name": "pg\_stat\_statements",  
    "version": "1.11",  
    "relocatable": true  
  },  
  {  
    "extension\_name": "pgcrypto",  
    "version": "1.3",  
    "relocatable": true  
  },  
  {  
    "extension\_name": "plpgsql",  
    "version": "1.0",  
    "relocatable": false  
  },  
  {  
    "extension\_name": "postgis",  
    "version": "3.3.7",  
    "relocatable": false  
  },  
  {  
    "extension\_name": "supabase\_vault",  
    "version": "0.3.1",  
    "relocatable": false  
  },  
  {  
    "extension\_name": "uuid-ossp",  
    "version": "1.1",  
    "relocatable": true  
  },  
  {  
    "extension\_name": "vector",  
    "version": "0.8.0",  
    "relocatable": true  
  }  
\]

### **10\. Constraints (CHECK, UNIQUE, etc.)**

\[  
  {  
    "table\_name": "line\_sessions",  
    "constraint\_name": "2200\_19034\_1\_not\_null",  
    "constraint\_type": "CHECK",  
    "check\_clause": "session\_id IS NOT NULL",  
    "column\_name": null  
  },  
  {  
    "table\_name": "master\_list",  
    "constraint\_name": "2200\_18915\_2\_not\_null",  
    "constraint\_type": "CHECK",  
    "check\_clause": "product\_name IS NOT NULL",  
    "column\_name": null  
  },  
  {  
    "table\_name": "master\_list",  
    "constraint\_name": "2200\_18915\_1\_not\_null",  
    "constraint\_type": "CHECK",  
    "check\_clause": "id IS NOT NULL",  
    "column\_name": null  
  },  
  {  
    "table\_name": "pricing\_history",  
    "constraint\_name": "2200\_19106\_10\_not\_null",  
    "constraint\_type": "CHECK",  
    "check\_clause": "effective\_date IS NOT NULL",  
    "column\_name": null  
  },  
  {  
    "table\_name": "pricing\_history",  
    "constraint\_name": "2200\_19106\_1\_not\_null",  
    "constraint\_type": "CHECK",  
    "check\_clause": "id IS NOT NULL",  
    "column\_name": null  
  },  
  {  
    "table\_name": "pricing\_history",  
    "constraint\_name": "2200\_19106\_5\_not\_null",  
    "constraint\_type": "CHECK",  
    "check\_clause": "unit\_price IS NOT NULL",  
    "column\_name": null  
  },  
  {  
    "table\_name": "product\_categories",  
    "constraint\_name": "2200\_18882\_1\_not\_null",  
    "constraint\_type": "CHECK",  
    "check\_clause": "id IS NOT NULL",  
    "column\_name": null  
  },  
  {  
    "table\_name": "product\_categories",  
    "constraint\_name": "2200\_18882\_2\_not\_null",  
    "constraint\_type": "CHECK",  
    "check\_clause": "category\_name IS NOT NULL",  
    "column\_name": null  
  },  
  {  
    "table\_name": "product\_categories",  
    "constraint\_name": "product\_categories\_category\_slug\_key",  
    "constraint\_type": "UNIQUE",  
    "check\_clause": null,  
    "column\_name": "category\_slug"  
  },  
  {  
    "table\_name": "purchase\_orders",  
    "constraint\_name": "2200\_19073\_1\_not\_null",  
    "constraint\_type": "CHECK",  
    "check\_clause": "order\_id IS NOT NULL",  
    "column\_name": null  
  },  
  {  
    "table\_name": "restaurant\_people",  
    "constraint\_name": "2200\_19003\_5\_not\_null",  
    "constraint\_type": "CHECK",  
    "check\_clause": "last\_name IS NOT NULL",  
    "column\_name": null  
  },  
  {  
    "table\_name": "restaurant\_people",  
    "constraint\_name": "2200\_19003\_1\_not\_null",  
    "constraint\_type": "CHECK",  
    "check\_clause": "id IS NOT NULL",  
    "column\_name": null  
  },  
  {  
    "table\_name": "restaurant\_people",  
    "constraint\_name": "2200\_19003\_4\_not\_null",  
    "constraint\_type": "CHECK",  
    "check\_clause": "first\_name IS NOT NULL",  
    "column\_name": null  
  },  
  {  
    "table\_name": "restaurant\_product\_preferences",  
    "constraint\_name": "2200\_40631\_1\_not\_null",  
    "constraint\_type": "CHECK",  
    "check\_clause": "id IS NOT NULL",  
    "column\_name": null  
  },  
  {  
    "table\_name": "restaurant\_product\_preferences",  
    "constraint\_name": "2200\_40631\_3\_not\_null",  
    "constraint\_type": "CHECK",  
    "check\_clause": "master\_list\_id IS NOT NULL",  
    "column\_name": null  
  },  
  {  
    "table\_name": "restaurant\_product\_preferences",  
    "constraint\_name": "2200\_40631\_2\_not\_null",  
    "constraint\_type": "CHECK",  
    "check\_clause": "restaurant\_id IS NOT NULL",  
    "column\_name": null  
  },  
  {  
    "table\_name": "restaurant\_product\_preferences",  
    "constraint\_name": "restaurant\_product\_preferences\_unique",  
    "constraint\_type": "UNIQUE",  
    "check\_clause": null,  
    "column\_name": "restaurant\_id"  
  },  
  {  
    "table\_name": "restaurant\_product\_preferences",  
    "constraint\_name": "restaurant\_product\_preferences\_unique",  
    "constraint\_type": "UNIQUE",  
    "check\_clause": null,  
    "column\_name": "master\_list\_id"  
  },  
  {  
    "table\_name": "restaurant\_product\_preferences\_history",  
    "constraint\_name": "2200\_40699\_3\_not\_null",  
    "constraint\_type": "CHECK",  
    "check\_clause": "restaurant\_id IS NOT NULL",  
    "column\_name": null  
  },  
  {  
    "table\_name": "restaurant\_product\_preferences\_history",  
    "constraint\_name": "2200\_40699\_1\_not\_null",  
    "constraint\_type": "CHECK",  
    "check\_clause": "id IS NOT NULL",  
    "column\_name": null  
  },  
  {  
    "table\_name": "restaurant\_product\_preferences\_history",  
    "constraint\_name": "2200\_40699\_2\_not\_null",  
    "constraint\_type": "CHECK",  
    "check\_clause": "preference\_id IS NOT NULL",  
    "column\_name": null  
  },  
  {  
    "table\_name": "restaurant\_product\_preferences\_history",  
    "constraint\_name": "2200\_40699\_5\_not\_null",  
    "constraint\_type": "CHECK",  
    "check\_clause": "change\_type IS NOT NULL",  
    "column\_name": null  
  },  
  {  
    "table\_name": "restaurant\_product\_preferences\_history",  
    "constraint\_name": "2200\_40699\_4\_not\_null",  
    "constraint\_type": "CHECK",  
    "check\_clause": "master\_list\_id IS NOT NULL",  
    "column\_name": null  
  },  
  {  
    "table\_name": "restaurants",  
    "constraint\_name": "2200\_18987\_7\_not\_null",  
    "constraint\_type": "CHECK",  
    "check\_clause": "street\_address IS NOT NULL",  
    "column\_name": null  
  },  
  {  
    "table\_name": "restaurants",  
    "constraint\_name": "2200\_18987\_1\_not\_null",  
    "constraint\_type": "CHECK",  
    "check\_clause": "id IS NOT NULL",  
    "column\_name": null  
  },  
  {  
    "table\_name": "restaurants",  
    "constraint\_name": "2200\_18987\_2\_not\_null",  
    "constraint\_type": "CHECK",  
    "check\_clause": "restaurant\_name IS NOT NULL",  
    "column\_name": null  
  },  
  {  
    "table\_name": "spatial\_ref\_sys",  
    "constraint\_name": "spatial\_ref\_sys\_srid\_check",  
    "constraint\_type": "CHECK",  
    "check\_clause": null,  
    "column\_name": null  
  },  
  {  
    "table\_name": "spatial\_ref\_sys",  
    "constraint\_name": "2200\_17605\_1\_not\_null",  
    "constraint\_type": "CHECK",  
    "check\_clause": null,  
    "column\_name": null  
  },  
  {  
    "table\_name": "supplier\_mapped\_products",  
    "constraint\_name": "2200\_18964\_1\_not\_null",  
    "constraint\_type": "CHECK",  
    "check\_clause": "id IS NOT NULL",  
    "column\_name": null  
  },  
  {  
    "table\_name": "supplier\_mapped\_products",  
    "constraint\_name": "2200\_18964\_45\_not\_null",  
    "constraint\_type": "CHECK",  
    "check\_clause": "supplier\_id IS NOT NULL",  
    "column\_name": null  
  },  
  {  
    "table\_name": "supplier\_mapped\_products",  
    "constraint\_name": "2200\_18964\_14\_not\_null",  
    "constraint\_type": "CHECK",  
    "check\_clause": "current\_unit\_price IS NOT NULL",  
    "column\_name": null  
  },  
  {  
    "table\_name": "supplier\_mapped\_products",  
    "constraint\_name": "2200\_18964\_8\_not\_null",  
    "constraint\_type": "CHECK",  
    "check\_clause": "mapping\_confidence IS NOT NULL",  
    "column\_name": null  
  },  
  {  
    "table\_name": "supplier\_mapped\_products",  
    "constraint\_name": "2200\_18964\_3\_not\_null",  
    "constraint\_type": "CHECK",  
    "check\_clause": "supplier\_product\_code IS NOT NULL",  
    "column\_name": null  
  },  
  {  
    "table\_name": "suppliers",  
    "constraint\_name": "2200\_18936\_2\_not\_null",  
    "constraint\_type": "CHECK",  
    "check\_clause": "company\_name IS NOT NULL",  
    "column\_name": null  
  },  
  {  
    "table\_name": "suppliers",  
    "constraint\_name": "2200\_18936\_1\_not\_null",  
    "constraint\_type": "CHECK",  
    "check\_clause": "id IS NOT NULL",  
    "column\_name": null  
  },  
  {  
    "table\_name": "user\_preferences",  
    "constraint\_name": "2200\_40425\_4\_not\_null",  
    "constraint\_type": "CHECK",  
    "check\_clause": "preference\_type IS NOT NULL",  
    "column\_name": null  
  },  
  {  
    "table\_name": "user\_preferences",  
    "constraint\_name": "2200\_40425\_1\_not\_null",  
    "constraint\_type": "CHECK",  
    "check\_clause": "id IS NOT NULL",  
    "column\_name": null  
  },  
  {  
    "table\_name": "user\_preferences",  
    "constraint\_name": "2200\_40425\_7\_not\_null",  
    "constraint\_type": "CHECK",  
    "check\_clause": "preference\_value IS NOT NULL",  
    "column\_name": null  
  }  
\]  
