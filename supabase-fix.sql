-- Fix: Grant table-level permissions to the 'anon' role (the public role)
GRANT SELECT, INSERT, DELETE ON public.study_plans TO anon;
GRANT USAGE ON SEQUENCE public.study_plans_id_seq TO anon;