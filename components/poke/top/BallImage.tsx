/*
BallImage.tsx
モンスターボール画像を表示し、
タップ時にデザインが切り替わるコンポーネントを提供します。
*/
import React, { useState } from 'react';
import {
    Image,
    ImageSourcePropType,
    ImageStyle,
    StyleProp,
    TouchableOpacity,
} from 'react-native';

type BallImage = {
    style: StyleProp<ImageStyle>;
};

export const BallImage: React.FC<BallImage> = ({ style }) => {
    const [ballType, setBallType] = useState(0);
    const ballImages: ImageSourcePropType[] = [
        require('@/assets/images/poke/monsterBall.png'),
        require('@/assets/images/poke/superBall.png'),
        require('@/assets/images/poke/hyperBall.png'),
        require('@/assets/images/poke/masterBall.png'),
    ];

    const handleTap = () => {
        setBallType((prev) => (prev + 1) % ballImages.length);
    };

    return (
        <TouchableOpacity onPress={handleTap}>
            <Image source={ballImages[ballType]} style={style} />
        </TouchableOpacity>
    );
};
