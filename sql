-- Disasters Table
CREATE TABLE disasters (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    location_name TEXT,
    location GEOGRAPHY(Point, 4326),
    description TEXT,
    tags TEXT[],
    owner_id TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    audit_trail JSONB
);

-- Reports Table
CREATE TABLE reports (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    disaster_id UUID REFERENCES disasters(id),
    user_id TEXT,
    content TEXT,
    image_url TEXT,
    verification_status TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Resources Table
CREATE TABLE resources (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    disaster_id UUID REFERENCES disasters(id),
    name TEXT,
    location_name TEXT,
    location GEOGRAPHY(Point, 4326),
    type TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Cache Table
CREATE TABLE cache (
    key TEXT PRIMARY KEY,
    value JSONB,
    expires_at TIMESTAMP
);

-- Indexes
CREATE INDEX disasters_location_idx ON disasters USING GIST (location);
CREATE INDEX resources_location_idx ON resources USING GIST (location);
CREATE INDEX disasters_tags_idx ON disasters USING GIN (tags);
CREATE INDEX disasters_owner_idx ON disasters (owner_id);
