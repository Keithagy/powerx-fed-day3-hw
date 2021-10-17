import { useAuthState } from 'domains/auth';
import { ListingItem, useListings } from 'domains/marketplace';
import { CartItems } from 'domains/marketplace/components/cart-items';
import { useCartItems } from '../domains/marketplace/hooks/use-cart-items';
export const Marketplace = () => {
    const { data: listings, isLoading } = useListings();
    const auth = useAuthState();
    const { data, loadData } = useCartItems();

    const onAddToCart = (listingId, token) => {
        fetch('https://ecomm-service.herokuapp.com/marketplace/cart/items', {
            method: 'POST',
            body: JSON.stringify({
                quantity: 1,
                listingId,
            }),
            headers: {
                accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        }).then((res) => {
            if (res.ok) {
                loadData();
                return res.json();
            }
            throw new Error(res.statusText);
        });
    };

    return (
        <div className="max-w-7xl mx-auto pt-16 pb-24 px-4 sm:px-6 lg:px-8">
            <div className="mb-12">
                <h1 className="text-5xl font-extrabold text-gray-900 sm:text-center">
                    Marketplace
                </h1>
            </div>
            <div className="bg-gray-50 lg:flex">
                <div className="flex-1">
                    {listings && (
                        <div className="grid md:grid-cols-2 gap-x-4 gap-y-8 xl:grid-cols-3 xl:gap-x-6">
                            {listings.map((item) => (
                                <ListingItem
                                    imageUrl={item.imageUrl}
                                    title={item.title}
                                    description={item.description}
                                    price={item.price}
                                    availableStock={item.numOfStock}
                                    onlyOne={
                                        item.availability === 'single-item'
                                    }
                                    onAddToCart={
                                        auth.status === 'authenticated'
                                            ? () =>
                                                  onAddToCart(
                                                      item._id,
                                                      auth.accessToken
                                                  )
                                            : undefined
                                    }
                                    listingId={item._id}
                                    key={item._id}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <div
                className="flex-initial
          bg-white
          w-full
          lg:max-w-md
          border-b border-gray-1006"
            >
                <CartItems data={data} loadData={loadData} />
            </div>
            {isLoading && (
                <div className="p-12 text-center text-3xl">Loading...</div>
            )}
        </div>
    );
};
