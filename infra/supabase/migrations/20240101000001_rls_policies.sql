-- Enable Row Level Security on all tables
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.providers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- Users policies
CREATE POLICY "Users can view their own profile" ON public.users
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.users
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" ON public.users
    FOR INSERT WITH CHECK (auth.uid() = id);

-- Providers policies
CREATE POLICY "Anyone can view verified providers" ON public.providers
    FOR SELECT USING (verified = true);

CREATE POLICY "Users can view their own provider profile" ON public.providers
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own provider profile" ON public.providers
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own provider profile" ON public.providers
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own provider profile" ON public.providers
    FOR DELETE USING (auth.uid() = user_id);

-- Services policies
CREATE POLICY "Anyone can view active services from verified providers" ON public.services
    FOR SELECT USING (
        active = true AND 
        EXISTS (
            SELECT 1 FROM public.providers 
            WHERE providers.id = services.provider_id 
            AND providers.verified = true
        )
    );

CREATE POLICY "Providers can view their own services" ON public.services
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.providers 
            WHERE providers.id = services.provider_id 
            AND providers.user_id = auth.uid()
        )
    );

CREATE POLICY "Providers can create their own services" ON public.services
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.providers 
            WHERE providers.id = services.provider_id 
            AND providers.user_id = auth.uid()
        )
    );

CREATE POLICY "Providers can update their own services" ON public.services
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM public.providers 
            WHERE providers.id = services.provider_id 
            AND providers.user_id = auth.uid()
        )
    );

CREATE POLICY "Providers can delete their own services" ON public.services
    FOR DELETE USING (
        EXISTS (
            SELECT 1 FROM public.providers 
            WHERE providers.id = services.provider_id 
            AND providers.user_id = auth.uid()
        )
    );

-- Bookings policies
CREATE POLICY "Users can view their own bookings as customer" ON public.bookings
    FOR SELECT USING (auth.uid() = customer_id);

CREATE POLICY "Providers can view bookings for their services" ON public.bookings
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.providers 
            WHERE providers.id = bookings.provider_id 
            AND providers.user_id = auth.uid()
        )
    );

CREATE POLICY "Users can create bookings as customer" ON public.bookings
    FOR INSERT WITH CHECK (auth.uid() = customer_id);

CREATE POLICY "Customers can update their own bookings" ON public.bookings
    FOR UPDATE USING (auth.uid() = customer_id);

CREATE POLICY "Providers can update bookings for their services" ON public.bookings
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM public.providers 
            WHERE providers.id = bookings.provider_id 
            AND providers.user_id = auth.uid()
        )
    );

-- Reviews policies
CREATE POLICY "Anyone can view reviews" ON public.reviews
    FOR SELECT USING (true);

CREATE POLICY "Customers can create reviews for their completed bookings" ON public.reviews
    FOR INSERT WITH CHECK (
        auth.uid() = customer_id AND
        EXISTS (
            SELECT 1 FROM public.bookings 
            WHERE bookings.id = reviews.booking_id 
            AND bookings.customer_id = auth.uid()
            AND bookings.status = 'completed'
        )
    );

CREATE POLICY "Customers can update their own reviews" ON public.reviews
    FOR UPDATE USING (auth.uid() = customer_id);

CREATE POLICY "Customers can delete their own reviews" ON public.reviews
    FOR DELETE USING (auth.uid() = customer_id);

-- Function to handle user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.users (id, email, full_name, avatar_url)
    VALUES (
        NEW.id,
        NEW.email,
        NEW.raw_user_meta_data->>'full_name',
        NEW.raw_user_meta_data->>'avatar_url'
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to automatically create user profile
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
