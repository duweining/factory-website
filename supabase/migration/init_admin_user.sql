INSERT INTO public.admin_users (username, password_hash, role) 
VALUES ('admin', '123456', 'admin')
ON CONFLICT (username) DO NOTHING;
