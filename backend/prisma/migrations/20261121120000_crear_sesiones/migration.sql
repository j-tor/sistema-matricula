CREATE TABLE "auth"."sesion" (
    "token_hash" VARCHAR(64) NOT NULL,
    "id_usuario" INTEGER NOT NULL,
    "expira_en" TIMESTAMPTZ(6) NOT NULL,
    CONSTRAINT "sesion_pkey" PRIMARY KEY ("token_hash")
);

CREATE INDEX "sesion_id_usuario_expira_en_idx" ON "auth"."sesion"("id_usuario", "expira_en");

ALTER TABLE "auth"."sesion" ADD CONSTRAINT "sesion_id_usuario_fkey"
    FOREIGN KEY ("id_usuario") REFERENCES "auth"."usuario"("id_usuario")
    ON DELETE CASCADE ON UPDATE CASCADE;
