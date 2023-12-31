import { db } from "./src/main";
import { getDocs, collection, query, where, getDoc, doc, updateDoc, addDoc } from "firebase/firestore";

// const arrayDePlantas = [
//   {
//     id: '1',
//     img: 'https://images.pexels.com/photos/5783396/pexels-photo-5783396.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
//     price: 150,
//     category: 'Interior',
//     name: 'Cactus ',
//     stock: 10,
//     description: 'El cactus espinoso es una planta fácil de cuidar que agrega un toque exótico a cualquier espacio interior.'
//   },
//   {
//     id: '2',
//     img: 'https://images.pexels.com/photos/1445419/pexels-photo-1445419.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
//     price: 240,
//     category: 'Exterior',
//     name: 'Cactus',
//     stock: 18,
//     description: 'Se destaca su condición de miniatura exótica, que a pesar de su pequeño tamaño, conserva todas las características distintivas de un cactus, incluyendo sus espinas y su forma única.'
//   },
//   {
//     id: '3',
//     img: 'https://images.pexels.com/photos/1302305/pexels-photo-1302305.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
//     price: 85,
//     category: 'Interior',
//     name: 'Cactus',
//     stock: 3,
//     description: 'Se puede describir como un cactus compacto y encantador, ideal para espacios reducidos o como parte de una colección más extensa de plantas.'
//   },
//   {
//     id: '4',
//     img: 'https://images.pexels.com/photos/1106443/pexels-photo-1106443.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
//     price: 85,
//     category: 'Interior',
//     name: 'Cactus ',
//     stock: 37,
//     description: 'La verdad es chiquito pero se la banca contra cualquiera '
//   },
//   {
//     id: '5',
//     img: 'https://images.pexels.com/photos/269255/pexels-photo-269255.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
//     price: 85,
//     category: 'Interior',
//     name: 'Cactus',
//     stock: 17,
//     description: 'Se subraya su atractivo visual y la facilidad con la que puede mantenerse, ya que, al ser pequeño, requiere menos espacio y cuidado en comparación con cactus más grandes.'
//   },
//   {
//     id: '6',
//     img: 'https://images.pexels.com/photos/1058963/pexels-photo-1058963.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
//     price: 85,
//     category: 'Interior',
//     name: 'Cactus',
//     stock: 10,
//     description: 'Chiquito pero peligroso'
//   }
// ]

// export const getProducts = () => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve(arrayDePlantas)
//     }, 500)
//   })
// }

// export const getProductById = (productId) => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve(arrayDePlantas.find(prod => prod.id === productId))
//     }, 500)
//   })
// }
// export const getProductsByCategory = () => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve(arrayDePlantas.filter(prod => prod.category === category))
//     })
//   })
// }
export const getProducts = async () => {
  const productsCollection = collection(db, 'item');
  const querySnapshot = await getDocs(productsCollection);
  const products = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  return products;
};


export const getProductById = async (itemId) => {
  console.log('Valor de itemId antes de la consulta:', itemId);

  try {
    const productsCollection = collection(db, 'item');
    const productDoc = await getDocs(query(productsCollection, where('id', '==', itemId)));

    if (productDoc.empty) {
      console.log(`No se encontró ningún producto con la ID: ${itemId}`);
      return null;
    }

    const product = { id: productDoc.docs[0].id, ...productDoc.docs[0].data() };
    console.log('Datos del producto recuperados correctamente:', product);
    return product;
  } catch (error) {
    console.error('Error al recuperar el producto:', error);
    throw error;
  }
};




export const getProductsByCategory = async (category) => {
  const productsCollection = collection(db, 'item');
  const querySnapshot = await getDocs(query(productsCollection, where('category', '==', category)));
  const products = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  return products;
};


/// lo nuevo ->

