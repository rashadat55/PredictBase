import { sdk } from 'https://esm.sh/@farcaster/frame-sdk';

// --- CONFIGURATION ---
const TARGET_WALLET = "0xEA61090CB8351b44D8207674dD6d89742dca857E"; 
const USDC_ADDRESS = "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913"; 
const BASE_CHAIN_ID = 8453;

// Maç Listesi (Eksiksiz)
const MATCHES = [
    { id: 1, date: 'Thu 11 June 2026', time: '23:00', stage: 'Group A', stadium: 'Mexico City', home: { n: 'Mexico', c: 'MEX', f: '🇲🇽' }, away: { n: 'South Africa', c: 'RSA', f: '🇿🇦' } },
    { id: 2, date: 'Fri 12 June 2026', time: '06:00', stage: 'Group A', stadium: 'Guadalajara', home: { n: 'Korea Republic', c: 'KOR', f: '🇰🇷' }, away: { n: 'Czechia', c: 'CZE', f: '🇨🇿' } },
    { id: 3, date: 'Fri 12 June 2026', time: '23:00', stage: 'Group B', stadium: 'Toronto', home: { n: 'Canada', c: 'CAN', f: '🇨🇦' }, away: { n: 'Bosnia', c: 'BIH', f: '🇧🇦' } },
    { id: 4, date: 'Sat 13 June 2026', time: '05:00', stage: 'Group D', stadium: 'Los Angeles', home: { n: 'USA', c: 'USA', f: '🇺🇸' }, away: { n: 'Paraguay', c: 'PAR', f: '🇵🇾' } },
    { id: 5, date: 'Sat 13 June 2026', time: '23:00', stage: 'Group B', stadium: 'San Francisco', home: { n: 'Qatar', c: 'QAT', f: '🇶🇦' }, away: { n: 'Switzerland', c: 'SUI', f: '🇨🇭' } },
    { id: 6, date: 'Sun 14 June 2026', time: '02:00', stage: 'Group C', stadium: 'New York/NJ', home: { n: 'Brazil', c: 'BRA', f: '🇧🇷' }, away: { n: 'Morocco', c: 'MAR', f: '🇲🇦' } },
    { id: 7, date: 'Sun 14 June 2026', time: '05:00', stage: 'Group C', stadium: 'Boston', home: { n: 'Haiti', c: 'HAI', f: '🇭🇹' }, away: { n: 'Scotland', c: 'SCO', f: '🏴󠁧󠁢󠁳󠁣󠁴󠁿' } },
    { id: 8, date: 'Sun 14 June 2026', time: '08:00', stage: 'Group D', stadium: 'Vancouver', home: { n: 'Australia', c: 'AUS', f: '🇦🇺' }, away: { n: 'Türkiye', c: 'TUR', f: '🇹🇷' } },
    { id: 9, date: 'Sun 14 June 2026', time: '21:00', stage: 'Group E', stadium: 'Houston', home: { n: 'Germany', c: 'GER', f: '🇩🇪' }, away: { n: 'Curaçao', c: 'CUW', f: '🇨🇼' } },
    { id: 10, date: 'Mon 15 June 2026', time: '00:00', stage: 'Group F', stadium: 'Dallas', home: { n: 'Netherlands', c: 'NED', f: '🇳🇱' }, away: { n: 'Japan', c: 'JPN', f: '🇯🇵' } },
    { id: 11, date: 'Mon 15 June 2026', time: '03:00', stage: 'Group E', stadium: 'Philadelphia', home: { n: "Côte d'Ivoire", c: 'CIV', f: '🇨🇮' }, away: { n: 'Ecuador', c: 'ECU', f: '🇪🇨' } },
    { id: 12, date: 'Mon 15 June 2026', time: '06:00', stage: 'Group F', stadium: 'Monterrey', home: { n: 'Sweden', c: 'SWE', f: '🇸🇪' }, away: { n: 'Tunisia', c: 'TUN', f: '🇹🇳' } },
    { id: 13, date: 'Mon 15 June 2026', time: '20:00', stage: 'Group H', stadium: 'Atlanta', home: { n: 'Spain', c: 'ESP', f: '🇪🇸' }, away: { n: 'Cabo Verde', c: 'CPV', f: '🇨🇻' } },
    { id: 14, date: 'Mon 15 June 2026', time: '23:00', stage: 'Group G', stadium: 'Seattle', home: { n: 'Belgium', c: 'BEL', f: '🇧🇪' }, away: { n: 'Egypt', c: 'EGY', f: '🇪🇬' } },
    { id: 15, date: 'Tue 16 June 2026', time: '02:00', stage: 'Group H', stadium: 'Miami', home: { n: 'Saudi Arabia', c: 'KSA', f: '🇸🇦' }, away: { n: 'Uruguay', c: 'URU', f: '🇺🇾' } },
    { id: 16, date: 'Tue 16 June 2026', time: '05:00', stage: 'Group G', stadium: 'Los Angeles', home: { n: 'IR Iran', c: 'IRN', f: '🇮🇷' }, away: { n: 'New Zealand', c: 'NZL', f: '🇳🇿' } },
    { id: 17, date: 'Tue 16 June 2026', time: '23:00', stage: 'Group I', stadium: 'New York/NJ', home: { n: 'France', c: 'FRA', f: '🇫🇷' }, away: { n: 'Senegal', c: 'SEN', f: '🇸🇳' } },
    { id: 18, date: 'Wed 17 June 2026', time: '02:00', stage: 'Group I', stadium: 'Boston', home: { n: 'Iraq', c: 'IRQ', f: '🇮🇶' }, away: { n: 'Norway', c: 'NOR', f: '🇳🇴' } },
    { id: 19, date: 'Wed 17 June 2026', time: '05:00', stage: 'Group J', stadium: 'Kansas City', home: { n: 'Argentina', c: 'ARG', f: '🇦🇷' }, away: { n: 'Algeria', c: 'ALG', f: '🇩🇿' } },
    { id: 20, date: 'Wed 17 June 2026', time: '08:00', stage: 'Group J', stadium: 'San Francisco', home: { n: 'Austria', c: 'AUT', f: '🇦🇹' }, away: { n: 'Jordan', c: 'JOR', f: '🇯🇴' } },
    { id: 21, date: 'Wed 17 June 2026', time: '21:00', stage: 'Group K', stadium: 'Houston', home: { n: 'Portugal', c: 'POR', f: '🇵🇹' }, away: { n: 'Congo DR', c: 'COD', f: '🇨🇩' } },
    { id: 22, date: 'Thu 18 June 2026', time: '00:00', stage: 'Group L', stadium: 'Dallas', home: { n: 'England', c: 'ENG', f: '🏴󠁧󠁢󠁥󠁮󠁧󠁿' }, away: { n: 'Croatia', c: 'CRO', f: '🇭🇷' } },
    { id: 23, date: 'Thu 18 June 2026', time: '03:00', stage: 'Group L', stadium: 'Toronto', home: { n: 'Ghana', c: 'GHA', f: '🇬🇭' }, away: { n: 'Panama', c: 'PAN', f: '🇵🇦' } },
    { id: 24, date: 'Thu 18 June 2026', time: '06:00', stage: 'Group K', stadium: 'Mexico City', home: { n: 'Uzbekistan', c: 'UZB', f: '🇺🇿' }, away: { n: 'Colombia', c: 'COL', f: '🇨🇴' } },
    { id: 25, date: 'Thu 18 June 2026', time: '20:00', stage: 'Group A', stadium: 'Atlanta', home: { n: 'Czechia', c: 'CZE', f: '🇨🇿' }, away: { n: 'South Africa', c: 'RSA', f: '🇿🇦' } },
    { id: 26, date: 'Thu 18 June 2026', time: '23:00', stage: 'Group B', stadium: 'Los Angeles', home: { n: 'Switzerland', c: 'SUI', f: '🇨🇭' }, away: { n: 'Bosnia', c: 'BIH', f: '🇧🇦' } },
    { id: 27, date: 'Fri 19 June 2026', time: '02:00', stage: 'Group B', stadium: 'Vancouver', home: { n: 'Canada', c: 'CAN', f: '🇨🇦' }, away: { n: 'Qatar', c: 'QAT', f: '🇶🇦' } },
    { id: 28, date: 'Fri 19 June 2026', time: '05:00', stage: 'Group A', stadium: 'Guadalajara', home: { n: 'Mexico', c: 'MEX', f: '🇲🇽' }, away: { n: 'Korea Rep.', c: 'KOR', f: '🇰🇷' } },
    { id: 29, date: 'Fri 19 June 2026', time: '23:00', stage: 'Group D', stadium: 'Seattle', home: { n: 'USA', c: 'USA', f: '🇺🇸' }, away: { n: 'Australia', c: 'AUS', f: '🇦🇺' } },
    { id: 30, date: 'Sat 20 June 2026', time: '02:00', stage: 'Group C', stadium: 'Boston', home: { n: 'Scotland', c: 'SCO', f: '🏴󠁧󠁢󠁳󠁣󠁴󠁿' }, away: { n: 'Morocco', c: 'MAR', f: '🇲🇦' } },
    { id: 31, date: 'Sat 20 June 2026', time: '04:30', stage: 'Group C', stadium: 'Philadelphia', home: { n: 'Brazil', c: 'BRA', f: '🇧🇷' }, away: { n: 'Haiti', c: 'HAI', f: '🇭🇹' } },
    { id: 32, date: 'Sat 20 June 2026', time: '07:00', stage: 'Group D', stadium: 'San Francisco', home: { n: 'Türkiye', c: 'TUR', f: '🇹🇷' }, away: { n: 'Paraguay', c: 'PAR', f: '🇵🇾' } },
    { id: 33, date: 'Sat 20 June 2026', time: '21:00', stage: 'Group F', stadium: 'Houston', home: { n: 'Netherlands', c: 'NED', f: '🇳🇱' }, away: { n: 'Sweden', c: 'SWE', f: '🇸🇪' } },
    { id: 34, date: 'Sun 21 June 2026', time: '00:00', stage: 'Group E', stadium: 'Toronto', home: { n: 'Germany', c: 'GER', f: '🇩🇪' }, away: { n: 'Côte d’Ivoire', c: 'CIV', f: '🇨🇮' } },
    { id: 35, date: 'Sun 21 June 2026', time: '04:00', stage: 'Group E', stadium: 'Kansas City', home: { n: 'Ecuador', c: 'ECU', f: '🇪🇨' }, away: { n: 'Curaçao', c: 'CUW', f: '🇨🇼' } },
    { id: 36, date: 'Sun 21 June 2026', time: '08:00', stage: 'Group F', stadium: 'Monterrey', home: { n: 'Tunisia', c: 'TUN', f: '🇹🇳' }, away: { n: 'Japan', c: 'JPN', f: '🇯🇵' } },
    { id: 37, date: 'Sun 21 June 2026', time: '20:00', stage: 'Group H', stadium: 'Atlanta', home: { n: 'Spain', c: 'ESP', f: '🇪🇸' }, away: { n: 'Saudi Arabia', c: 'KSA', f: '🇸🇦' } },
    { id: 38, date: 'Sun 21 June 2026', time: '23:00', stage: 'Group G', stadium: 'Los Angeles', home: { n: 'Belgium', c: 'BEL', f: '🇧🇪' }, away: { n: 'IR Iran', c: 'IRN', f: '🇮🇷' } },
    { id: 39, date: 'Mon 22 June 2026', time: '02:00', stage: 'Group H', stadium: 'Miami', home: { n: 'Uruguay', c: 'URU', f: '🇺🇾' }, away: { n: 'Cabo Verde', c: 'CPV', f: '🇨🇻' } },
    { id: 40, date: 'Mon 22 June 2026', time: '05:00', stage: 'Group G', stadium: 'Vancouver', home: { n: 'New Zealand', c: 'NZL', f: '🇳🇿' }, away: { n: 'Egypt', c: 'EGY', f: '🇪🇬' } },
    { id: 41, date: 'Mon 22 June 2026', time: '21:00', stage: 'Group J', stadium: 'Dallas', home: { n: 'Argentina', c: 'ARG', f: '🇦🇷' }, away: { n: 'Austria', c: 'AUT', f: '🇦🇹' } },
    { id: 42, date: 'Tue 23 June 2026', time: '01:00', stage: 'Group I', stadium: 'Philadelphia', home: { n: 'France', c: 'FRA', f: '🇫🇷' }, away: { n: 'Iraq', c: 'IRQ', f: '🇮🇶' } },
    { id: 43, date: 'Tue 23 June 2026', time: '04:00', stage: 'Group I', stadium: 'New York/NJ', home: { n: 'Norway', c: 'NOR', f: '🇳🇴' }, away: { n: 'Senegal', c: 'SEN', f: '🇸🇳' } },
    { id: 44, date: 'Tue 23 June 2026', time: '07:00', stage: 'Group J', stadium: 'San Francisco', home: { n: 'Jordan', c: 'JOR', f: '🇯🇴' }, away: { n: 'Algeria', c: 'ALG', f: '🇩🇿' } },
    { id: 45, date: 'Tue 23 June 2026', time: '21:00', stage: 'Group K', stadium: 'Houston', home: { n: 'Portugal', c: 'POR', f: '🇵🇹' }, away: { n: 'Uzbekistan', c: 'UZB', f: '🇺🇿' } },
    { id: 46, date: 'Wed 24 June 2026', time: '00:00', stage: 'Group L', stadium: 'Boston', home: { n: 'England', c: 'ENG', f: '🏴󠁧󠁢󠁥󠁮󠁧󠁿' }, away: { n: 'Ghana', c: 'GHA', f: '🇬🇭' } },
    { id: 47, date: 'Wed 24 June 2026', time: '03:00', stage: 'Group L', stadium: 'Toronto', home: { n: 'Panama', c: 'PAN', f: '🇵🇦' }, away: { n: 'Croatia', c: 'CRO', f: '🇭🇷' } },
    { id: 48, date: 'Wed 24 June 2026', time: '06:00', stage: 'Group K', stadium: 'Guadalajara', home: { n: 'Colombia', c: 'COL', f: '🇨🇴' }, away: { n: 'Congo DR', c: 'COD', f: '🇨🇩' } },
    { id: 49, date: 'Wed 24 June 2026', time: '23:00', stage: 'Group B', stadium: 'Vancouver', home: { n: 'Switzerland', c: 'SUI', f: '🇨🇭' }, away: { n: 'Canada', c: 'CAN', f: '🇨🇦' } },
    { id: 50, date: 'Wed 24 June 2026', time: '23:00', stage: 'Group B', stadium: 'Seattle', home: { n: 'Bosnia', c: 'BIH', f: '🇧🇦' }, away: { n: 'Qatar', c: 'QAT', f: '🇶🇦' } },
    { id: 51, date: 'Thu 25 June 2026', time: '02:00', stage: 'Group C', stadium: 'Miami', home: { n: 'Scotland', c: 'SCO', f: '🏴󠁧󠁢󠁳󠁣󠁴󠁿' }, away: { n: 'Brazil', c: 'BRA', f: '🇧🇷' } },
    { id: 52, date: 'Thu 25 June 2026', time: '02:00', stage: 'Group C', stadium: 'Atlanta', home: { n: 'Morocco', c: 'MAR', f: '🇲🇦' }, away: { n: 'Haiti', c: 'HAI', f: '🇭🇹' } },
    { id: 53, date: 'Thu 25 June 2026', time: '05:00', stage: 'Group A', stadium: 'Mexico City', home: { n: 'Czechia', c: 'CZE', f: '🇨🇿' }, away: { n: 'Mexico', c: 'MEX', f: '🇲🇽' } },
    { id: 54, date: 'Thu 25 June 2026', time: '05:00', stage: 'Group A', stadium: 'Monterrey', home: { n: 'South Africa', c: 'RSA', f: '🇿🇦' }, away: { n: 'Korea Rep.', c: 'KOR', f: '🇰🇷' } },
    { id: 55, date: 'Fri 26 June 2026', time: '00:00', stage: 'Group E', stadium: 'Philadelphia', home: { n: 'Curaçao', c: 'CUW', f: '🇨🇼' }, away: { n: 'Côte d’Ivoire', c: 'CIV', f: '🇨🇮' } },
    { id: 56, date: 'Fri 26 June 2026', time: '00:00', stage: 'Group E', stadium: 'New York/NJ', home: { n: 'Ecuador', c: 'ECU', f: '🇪🇨' }, away: { n: 'Germany', c: 'GER', f: '🇩🇪' } },
    { id: 57, date: 'Fri 26 June 2026', time: '03:00', stage: 'Group F', stadium: 'Dallas', home: { n: 'Japan', c: 'JPN', f: '🇯🇵' }, away: { n: 'Sweden', c: 'SWE', f: '🇸🇪' } },
    { id: 58, date: 'Fri 26 June 2026', time: '03:00', stage: 'Group F', stadium: 'Kansas City', home: { n: 'Tunisia', c: 'TUN', f: '🇹🇳' }, away: { n: 'Netherlands', c: 'NED', f: '🇳🇱' } },
    { id: 59, date: 'Fri 26 June 2026', time: '06:00', stage: 'Group D', stadium: 'Los Angeles', home: { n: 'Türkiye', c: 'TUR', f: '🇹🇷' }, away: { n: 'USA', c: 'USA', f: '🇺🇸' } },
    { id: 60, date: 'Fri 26 June 2026', time: '06:00', stage: 'Group D', stadium: 'San Francisco', home: { n: 'Paraguay', c: 'PAR', f: '🇵🇾' }, away: { n: 'Australia', c: 'AUS', f: '🇦🇺' } },
    { id: 61, date: 'Fri 26 June 2026', time: '23:00', stage: 'Group I', stadium: 'Boston', home: { n: 'Norway', c: 'NOR', f: '🇳🇴' }, away: { n: 'France', c: 'FRA', f: '🇫🇷' } },
    { id: 62, date: 'Fri 26 June 2026', time: '23:00', stage: 'Group I', stadium: 'Toronto', home: { n: 'Senegal', c: 'SEN', f: '🇸🇳' }, away: { n: 'Iraq', c: 'IRQ', f: '🇮🇶' } },
    { id: 63, date: 'Sat 27 June 2026', time: '04:00', stage: 'Group H', stadium: 'Houston', home: { n: 'Cabo Verde', c: 'CPV', f: '🇨🇻' }, away: { n: 'Saudi Arabia', c: 'KSA', f: '🇸🇦' } },
    { id: 64, date: 'Sat 27 June 2026', time: '04:00', stage: 'Group H', stadium: 'Guadalajara', home: { n: 'Uruguay', c: 'URU', f: '🇺🇾' }, away: { n: 'Spain', c: 'ESP', f: '🇪🇸' } },
    { id: 65, date: 'Sat 27 June 2026', time: '07:00', stage: 'Group G', stadium: 'Seattle', home: { n: 'Egypt', c: 'EGY', f: '🇪🇬' }, away: { n: 'IR Iran', c: 'IRN', f: '🇮🇷' } },
    { id: 66, date: 'Sat 27 June 2026', time: '07:00', stage: 'Group G', stadium: 'Vancouver', home: { n: 'New Zealand', c: 'NZL', f: '🇳🇿' }, away: { n: 'Belgium', c: 'BEL', f: '🇧🇪' } },
    { id: 67, date: 'Sun 28 June 2026', time: '01:00', stage: 'Group L', stadium: 'New York/NJ', home: { n: 'Panama', c: 'PAN', f: '🇵🇦' }, away: { n: 'England', c: 'ENG', f: '🏴󠁧󠁢󠁥󠁮󠁧󠁿' } },
    { id: 68, date: 'Sun 28 June 2026', time: '01:00', stage: 'Group L', stadium: 'Philadelphia', home: { n: 'Croatia', c: 'CRO', f: '🇭🇷' }, away: { n: 'Ghana', c: 'GHA', f: '🇬🇭' } },
    { id: 69, date: 'Sun 28 June 2026', time: '03:30', stage: 'Group K', stadium: 'Miami', home: { n: 'Colombia', c: 'COL', f: '🇨🇴' }, away: { n: 'Portugal', c: 'POR', f: '🇵🇹' } },
    { id: 70, date: 'Sun 28 June 2026', time: '03:30', stage: 'Group K', stadium: 'Atlanta', home: { n: 'Congo DR', c: 'COD', f: '🇨🇩' }, away: { n: 'Uzbekistan', c: 'UZB', f: '🇺🇿' } },
    { id: 71, date: 'Sun 28 June 2026', time: '06:00', stage: 'Group J', stadium: 'Kansas City', home: { n: 'Algeria', c: 'ALG', f: '🇩🇿' }, away: { n: 'Austria', c: 'AUT', f: '🇦🇹' } },
    { id: 72, date: 'Sun 28 June 2026', time: '06:00', stage: 'Group J', stadium: 'Dallas', home: { n: 'Jordan', c: 'JOR', f: '🇯🇴' }, away: { n: 'Argentina', c: 'ARG', f: '🇦🇷' } },
    { id: 73, date: 'Sun 28 June 2026', time: '23:00', stage: 'Round of 32', stadium: 'Los Angeles', home: { n: '2A', c: '2A', f: '🏳️' }, away: { n: '2B', c: '2B', f: '🏳️' } },
    { id: 74, date: 'Mon 29 June 2026', time: '21:00', stage: 'Round of 32', stadium: 'Houston', home: { n: '1C', c: '1C', f: '🏳️' }, away: { n: '2F', c: '2F', f: '🏳️' } },
    { id: 75, date: 'Tue 30 June 2026', time: '00:30', stage: 'Round of 32', stadium: 'Boston', home: { n: '1E', c: '1E', f: '🏳️' }, away: { n: '3RD', c: '3RD', f: '🏳️' } },
    { id: 76, date: 'Tue 30 June 2026', time: '05:00', stage: 'Round of 32', stadium: 'Monterrey', home: { n: '1F', c: '1F', f: '🏳️' }, away: { n: '2C', c: '2C', f: '🏳️' } },
    { id: 77, date: 'Tue 30 June 2026', time: '21:00', stage: 'Round of 32', stadium: 'Dallas', home: { n: '2E', c: '2E', f: '🏳️' }, away: { n: '2I', c: '2I', f: '🏳️' } },
    { id: 78, date: 'Wed 01 July 2026', time: '01:00', stage: 'Round of 32', stadium: 'New York/NJ', home: { n: '1I', c: '1I', f: '🏳️' }, away: { n: '3RD', c: '3RD', f: '🏳️' } },
    { id: 79, date: 'Wed 01 July 2026', time: '05:00', stage: 'Round of 32', stadium: 'Mexico City', home: { n: '1A', c: '1A', f: '🏳️' }, away: { n: '3RD', c: '3RD', f: '🏳️' } },
    { id: 80, date: 'Wed 01 July 2026', time: '20:00', stage: 'Round of 32', stadium: 'Atlanta', home: { n: '1L', c: '1L', f: '🏳️' }, away: { n: '3RD', c: '3RD', f: '🏳️' } },
    { id: 81, date: 'Thu 02 July 2026', time: '00:00', stage: 'Round of 32', stadium: 'Seattle', home: { n: '1G', c: '1G', f: '🏳️' }, away: { n: '3RD', c: '3RD', f: '🏳️' } },
    { id: 82, date: 'Thu 02 July 2026', time: '04:00', stage: 'Round of 32', stadium: 'San Francisco', home: { n: '1D', c: '1D', f: '🏳️' }, away: { n: '3RD', c: '3RD', f: '🏳️' } },
    { id: 83, date: 'Thu 02 July 2026', time: '23:00', stage: 'Round of 32', stadium: 'Los Angeles', home: { n: '1H', c: '1H', f: '🏳️' }, away: { n: '2J', c: '2J', f: '🏳️' } },
    { id: 84, date: 'Fri 03 July 2026', time: '03:00', stage: 'Round of 32', stadium: 'Toronto', home: { n: '2K', c: '2K', f: '🏳️' }, away: { n: '2L', c: '2L', f: '🏳️' } },
    { id: 85, date: 'Fri 03 July 2026', time: '07:00', stage: 'Round of 32', stadium: 'Vancouver', home: { n: '1B', c: '1B', f: '🏳️' }, away: { n: '3RD', c: '3RD', f: '🏳️' } },
    { id: 86, date: 'Fri 03 July 2026', time: '22:00', stage: 'Round of 32', stadium: 'Dallas', home: { n: '2D', c: '2D', f: '🏳️' }, away: { n: '2G', c: '2G', f: '🏳️' } },
    { id: 87, date: 'Sat 04 July 2026', time: '02:00', stage: 'Round of 32', stadium: 'Miami', home: { n: '1J', c: '1J', f: '🏳️' }, away: { n: '2H', c: '2H', f: '🏳️' } },
    { id: 88, date: 'Sat 04 July 2026', time: '05:30', stage: 'Round of 32', stadium: 'Kansas City', home: { n: '1K', c: '1K', f: '🏳️' }, away: { n: '3RD', c: '3RD', f: '🏳️' } },
    { id: 89, date: 'Sat 04 July 2026', time: '21:00', stage: 'Round of 16', stadium: 'Houston', home: { n: 'W73', c: 'W73', f: '?' }, away: { n: 'W75', c: 'W75', f: '?' } },
    { id: 90, date: 'Sun 05 July 2026', time: '01:00', stage: 'Round of 16', stadium: 'Philadelphia', home: { n: 'W74', c: 'W74', f: '?' }, away: { n: 'W77', c: 'W77', f: '?' } },
    { id: 91, date: 'Mon 06 July 2026', time: '00:00', stage: 'Round of 16', stadium: 'New York/NJ', home: { n: 'W76', c: 'W76', f: '?' }, away: { n: 'W78', c: 'W78', f: '?' } },
    { id: 92, date: 'Mon 06 July 2026', time: '04:00', stage: 'Round of 16', stadium: 'Mexico City', home: { n: 'W79', c: 'W79', f: '?' }, away: { n: 'W80', c: 'W80', f: '?' } },
    { id: 93, date: 'Mon 06 July 2026', time: '23:00', stage: 'Round of 16', stadium: 'Dallas', home: { n: 'W83', c: 'W83', f: '?' }, away: { n: 'W84', c: 'W84', f: '?' } },
    { id: 94, date: 'Tue 07 July 2026', time: '04:00', stage: 'Round of 16', stadium: 'Seattle', home: { n: 'W81', c: 'W81', f: '?' }, away: { n: 'W82', c: 'W82', f: '?' } },
    { id: 95, date: 'Tue 07 July 2026', time: '20:00', stage: 'Round of 16', stadium: 'Atlanta', home: { n: 'W86', c: 'W86', f: '?' }, away: { n: 'W88', c: 'W88', f: '?' } },
    { id: 96, date: 'Wed 08 July 2026', time: '00:00', stage: 'Round of 16', stadium: 'Vancouver', home: { n: 'W85', c: 'W85', f: '?' }, away: { n: 'W87', c: 'W87', f: '?' } },
    { id: 97, date: 'Fri 10 July 2026', time: '00:00', stage: 'Quarter-final', stadium: 'Boston', home: { n: 'W89', c: 'W89', f: '?' }, away: { n: 'W90', c: 'W90', f: '?' } },
    { id: 98, date: 'Fri 10 July 2026', time: '23:00', stage: 'Quarter-final', stadium: 'Los Angeles', home: { n: 'W93', c: 'W93', f: '?' }, away: { n: 'W94', c: 'W94', f: '?' } },
    { id: 99, date: 'Sun 12 July 2026', time: '01:00', stage: 'Quarter-final', stadium: 'Miami', home: { n: 'W91', c: 'W91', f: '?' }, away: { n: 'W92', c: 'W92', f: '?' } },
    { id: 100, date: 'Sun 12 July 2026', time: '05:00', stage: 'Quarter-final', stadium: 'Kansas City', home: { n: 'W95', c: 'W95', f: '?' }, away: { n: 'W96', c: 'W96', f: '?' } },
    { id: 101, date: 'Tue 14 July 2026', time: '23:00', stage: 'Semi-final', stadium: 'Dallas', home: { n: 'W97', c: 'W97', f: '?' }, away: { n: 'W98', c: 'W98', f: '?' } },
    { id: 102, date: 'Wed 15 July 2026', time: '23:00', stage: 'Semi-final', stadium: 'Atlanta', home: { n: 'W99', c: 'W99', f: '?' }, away: { n: 'W100', c: 'W100', f: '?' } },
    { id: 103, date: 'Sun 18 July 2026', time: '01:00', stage: 'Third Place', stadium: 'Miami', home: { n: 'RU101', c: 'RU1', f: '🥉' }, away: { n: 'RU102', c: 'RU2', f: '🥉' } },
    { id: 104, date: 'Sun 19 July 2026', time: '23:00', stage: 'FINAL', stadium: 'New York/NJ', home: { n: 'W101', c: 'W101', f: '🏆' }, away: { n: 'W102', c: 'W102', f: '🏆' } }
];

let ENV = 'web';
let connectedAddress = null;

// --- UI GÜNCELLEME ---
function updateUI(status) {
    const el = document.getElementById('user-display');
    if (el) el.innerText = status;
}

// --- MAÇLARI LİSTELEME ---
function render(filter = "") {
    const list = document.getElementById('match-list');
    if (!list) return;

    try {
        const filtered = MATCHES.filter(m => 
            m.home.n.toLowerCase().includes(filter.toLowerCase()) || 
            m.away.n.toLowerCase().includes(filter.toLowerCase()) ||
            (m.stage && m.stage.toLowerCase().includes(filter.toLowerCase()))
        );

        list.innerHTML = filtered.map(m => `
            <div class="bg-white/5 p-5 rounded-[2rem] border border-white/10 flex justify-between items-center relative transition-all active:scale-95 group hover:border-emerald-500/30">
                <div class="flex flex-col items-center w-[35%] gap-1">
                    <div class="text-4xl drop-shadow-md group-hover:scale-110 transition-transform">${m.home.f}</div>
                    <div class="text-[9px] font-black text-white uppercase text-center leading-tight tracking-tighter">${m.home.n}</div>
                </div>
                <div class="flex flex-col items-center justify-center w-[30%]">
                    <div class="text-[7px] text-emerald-500 font-black uppercase tracking-[0.2em] mb-1 opacity-80">${m.stage || ''}</div>
                    <div class="text-xl font-black text-white/20 italic">VS</div>
                    <div class="text-[7px] text-gray-500 font-bold uppercase mt-1 tracking-widest">${m.date ? m.date.split(' 2026')[0] : ''}</div>
                </div>
                <div class="flex flex-col items-center w-[35%] gap-1">
                    <div class="text-4xl drop-shadow-md group-hover:scale-110 transition-transform">${m.away.f}</div>
                    <div class="text-[9px] font-black text-white uppercase text-center leading-tight tracking-tighter">${m.away.n}</div>
                </div>
                <button onclick="window.openModal(${m.id})" class="absolute inset-0 w-full h-full opacity-0 cursor-pointer"></button>
            </div>
        `).join('');
    } catch (e) {
        console.error("Render Error:", e);
    }
}

// --- TAHMİN GEÇMİŞİNİ LİSTELEME ---
function renderHistory() {
    const container = document.getElementById('user-history-container');
    const list = document.getElementById('history-list');
    if (!container || !list) return;

    const history = JSON.parse(localStorage.getItem('predict_history') || "[]");
    if (history.length === 0) {
        container.classList.add('hidden');
        return;
    }

    container.classList.remove('hidden');
    list.innerHTML = history.map(item => {
        const match = MATCHES.find(m => m.id == item.mId);
        if (!match) return '';
        return `
            <div class="bg-white/5 border border-white/10 p-3 rounded-2xl flex justify-between items-center mb-2">
                <div class="flex items-center gap-3">
                    <span class="text-xl">${match.home.f} ${item.hScore} - ${item.aScore} ${match.away.f}</span>
                    <div class="flex flex-col">
                        <span class="text-[8px] text-gray-500 uppercase font-bold">${match.home.n} vs ${match.away.n}</span>
                        <a href="https://basescan.org/tx/${item.txHash}" target="_blank" class="text-[7px] text-emerald-500 underline uppercase tracking-tighter">View Tx</a>
                    </div>
                </div>
                <span class="text-[7px] bg-emerald-500/10 text-emerald-500 px-2 py-0.5 rounded-md font-black uppercase tracking-widest">Pending</span>
            </div>
        `;
    }).join('');
}

// --- MODAL AÇMA ---
window.openModal = (id) => {
    const m = MATCHES.find(x => x.id === id);
    if (!m) return;

    document.getElementById('current-match-id').value = id;
    document.getElementById('modal-title').innerText = `${m.home.n} VS ${m.away.n}`;
    document.getElementById('m-home-flag').innerText = m.home.f;
    document.getElementById('m-away-flag').innerText = m.away.f;
    
    document.getElementById('predict-modal').style.display = 'flex';
};

// --- CÜZDAN BAĞLAMA ---
async function setupWallet() {
    const btn = document.getElementById('wallet-btn');
    if (!btn) return;
    btn.innerText = "WAITING...";

    try {
        if (ENV === 'farcaster') {
            const accounts = await sdk.wallet.ethProvider.request({ method: 'eth_requestAccounts' });
            connectedAddress = accounts[0];
        } else if (window.ethereum) {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            connectedAddress = accounts[0];
            const chainId = await window.ethereum.request({ method: 'eth_chainId' });
            if (parseInt(chainId, 16) !== BASE_CHAIN_ID) {
                await window.ethereum.request({ method: 'wallet_switchEthereumChain', params: [{ chainId: '0x2105' }] });
            }
        }

        if (connectedAddress) {
            btn.innerText = `${connectedAddress.slice(0, 5).toUpperCase()}...${connectedAddress.slice(-4).toUpperCase()}`;
            btn.style.color = "#10b981";
            renderHistory();
        }
    } catch (e) {
        console.error("Wallet Error:", e);
        btn.innerText = "CONNECT";
    }
}

// --- İŞLEM GÖNDERME ---
async function handleTransaction() {
    if (!connectedAddress) { await setupWallet(); if (!connectedAddress) return; }

    const mId = document.getElementById('current-match-id').value;
    const hScore = document.getElementById('s-home').value;
    const aScore = document.getElementById('s-away').value;
    const confirmBtn = document.getElementById('confirm-btn');

    confirmBtn.disabled = true;
    confirmBtn.innerText = "SIGNING...";

    try {
        const cleanAddress = TARGET_WALLET.toLowerCase().replace("0x", "");
        const abiMethod = "0xa9059cbb"; 
        const paddedAddress = cleanAddress.padStart(64, "0");
        const amountHex = (2000).toString(16).padStart(64, "0"); 
        
        const mIdHex = parseInt(mId).toString(16).padStart(4, "0");
        const hScoreHex = parseInt(hScore).toString(16).padStart(2, "0");
        const aScoreHex = parseInt(awayScore).toString(16).padStart(2, "0");
        const memo = "abcdef" + mIdHex + hScoreHex + aScoreHex;

        const transactionData = abiMethod + paddedAddress + amountHex + memo;

        const txParams = {
            from: connectedAddress,
            to: USDC_ADDRESS, 
            data: transactionData, 
            value: "0x0",
            chainId: BASE_CHAIN_ID
        };

        const txHash = (ENV === 'farcaster') 
            ? await sdk.wallet.ethProvider.request({ method: 'eth_sendTransaction', params: [txParams] })
            : await window.ethereum.request({ method: 'eth_sendTransaction', params: [txParams] });

        // Kaydet
        const history = JSON.parse(localStorage.getItem('predict_history') || "[]");
        history.unshift({ mId, hScore, aScore, txHash });
        localStorage.setItem('predict_history', JSON.stringify(history));

        alert("Prediction sent!");
        document.getElementById('predict-modal').style.display = 'none';
        renderHistory();
    } catch (err) {
        alert("Error sending transaction.");
    } finally {
        confirmBtn.disabled = false;
        confirmBtn.innerText = "CONFIRM PREDICTION";
    }
}

// --- BAŞLATMA ---
async function init() {
    console.log("App starting...");
    
    // 1. Önce içeriği çiz (SDK'yı beklemeden)
    render();
    renderHistory();

    // 2. Event Listeners
    const search = document.getElementById('match-search');
    if (search) search.oninput = (e) => render(e.target.value);
    
    const walletBtn = document.getElementById('wallet-btn');
    if (walletBtn) walletBtn.onclick = setupWallet;

    const modalClose = document.getElementById('modal-close');
    if (modalClose) modalClose.onclick = () => document.getElementById('predict-modal').style.display = 'none';

    const confirmBtn = document.getElementById('confirm-btn');
    if (confirmBtn) confirmBtn.onclick = handleTransaction;

    // 3. Farcaster SDK (Kritik: Hata alsa bile UI'ı bozmaz)
    try {
        await sdk.actions.ready();
        const context = await sdk.context;
        if (context?.user) {
            ENV = 'farcaster';
            updateUI(context.user.username.toUpperCase());
            setupWallet(); 
        } else {
            updateUI("BROWSER MODE");
        }
    } catch (e) {
        ENV = 'web';
        updateUI("WEB BROWSER");
        console.log("Not in Farcaster environment.");
    }
}

// Başlat
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
