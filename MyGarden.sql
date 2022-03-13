CREATE TABLE "my_garden_records"(
    "id" serial NOT NULL,
    "date_time" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL,
    "temperature" DOUBLE PRECISION NOT NULL,
    "humidity" DOUBLE PRECISION NOT NULL
);
ALTER TABLE
    "my_garden_records" ADD PRIMARY KEY("id");