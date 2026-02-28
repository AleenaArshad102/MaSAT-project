import { useState, useEffect } from 'react'
import { Store, Users, Search, Plus, Trash2, ChevronDown, ChevronUp, DollarSign } from 'lucide-react'

const MerchantManagement = () => {
  const [merchants, setMerchants] = useState([])
  const [merchantCoinSellers, setMerchantCoinSellers] = useState({})
  const [expandedMerchants, setExpandedMerchants] = useState({})
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('view') // 'view', 'assign-merchant', 'assign-coin-seller', 'solo-coin-sellers'

  // For assigning merchant
  const [nonMerchants, setNonMerchants] = useState([])
  const [selectedUser, setSelectedUser] = useState(null)
  const [referenceInput, setReferenceInput] = useState('')
  const [assigning, setAssigning] = useState(false)

  // For assigning coin seller
  const [nonCoinSellers, setNonCoinSellers] = useState([])
  const [selectedMerchant, setSelectedMerchant] = useState(null)
  const [selectedCoinSellerUser, setSelectedCoinSellerUser] = useState(null)
  const [csReferenceInput, setCsReferenceInput] = useState('')
  const [assigningCoinSeller, setAssigningCoinSeller] = useState(false)

  // For solo coin sellers
  const [soloCoinSellers, setSoloCoinSellers] = useState([])

  const [searchTerm, setSearchTerm] = useState('')

  // For recharging merchant or solo coin seller
  const [rechargeDialogOpen, setRechargeDialogOpen] = useState(false)
  const [selectedMerchantForRecharge, setSelectedMerchantForRecharge] = useState(null)
  const [rechargeAmount, setRechargeAmount] = useState('')
  const [rechargeNote, setRechargeNote] = useState('')
  const [recharging, setRecharging] = useState(false)
  const [rechargeType, setRechargeType] = useState('merchant') // 'merchant' or 'coin_seller'

  // Dummy data
  const dummyMerchants = [
    {
      userId: 'm1',
      name: 'John Smith',
      email: 'john.smith@example.com',
      isVerified: true,
      referredBy: 'admin1',
      coinsBalance: 5000000
    },
    {
      userId: 'm2',
      name: 'Sarah Johnson',
      email: 'sarah.j@example.com',
      isVerified: true,
      referredBy: null,
      coinsBalance: 3250000
    },
    {
      userId: 'm3',
      name: 'Mike Wilson',
      email: 'mike.w@example.com',
      isVerified: false,
      referredBy: 'john.smith@example.com',
      coinsBalance: 1500000
    },
    {
      userId: 'm4',
      name: 'Emma Davis',
      email: 'emma.d@example.com',
      isVerified: true,
      referredBy: 'admin2',
      coinsBalance: 8750000
    },
    {
      userId: 'm5',
      name: 'Robert Brown',
      email: 'robert.b@example.com',
      isVerified: true,
      referredBy: 'sarah.j@example.com',
      coinsBalance: 2200000
    }
  ]

  const dummyCoinSellers = {
    m1: [
      {
        userId: 'cs1',
        name: 'Alice Cooper',
        email: 'alice.c@example.com',
        referredBy: 'john.smith@example.com'
      },
      {
        userId: 'cs2',
        name: 'Bob Martin',
        email: 'bob.m@example.com',
        referredBy: null
      }
    ],
    m2: [
      {
        userId: 'cs3',
        name: 'Carol White',
        email: 'carol.w@example.com',
        referredBy: 'sarah.j@example.com'
      }
    ],
    m3: [],
    m4: [
      {
        userId: 'cs4',
        name: 'David Lee',
        email: 'david.l@example.com',
        referredBy: null
      },
      {
        userId: 'cs5',
        name: 'Eva Green',
        email: 'eva.g@example.com',
        referredBy: 'emma.d@example.com'
      },
      {
        userId: 'cs6',
        name: 'Frank Moore',
        email: 'frank.m@example.com',
        referredBy: 'emma.d@example.com'
      }
    ],
    m5: [
      {
        userId: 'cs7',
        name: 'Grace Hall',
        email: 'grace.h@example.com',
        referredBy: 'robert.b@example.com'
      }
    ]
  }

  const dummyNonMerchants = [
    {
      userId: 'u1',
      name: 'Peter Parker',
      email: 'peter.p@example.com'
    },
    {
      userId: 'u2',
      name: 'Mary Jane',
      email: 'mary.j@example.com'
    },
    {
      userId: 'u3',
      name: 'Tony Stark',
      email: 'tony.s@example.com'
    },
    {
      userId: 'u4',
      name: 'Natasha Romanoff',
      email: 'natasha.r@example.com'
    },
    {
      userId: 'u5',
      name: 'Bruce Banner',
      email: 'bruce.b@example.com'
    }
  ]

  const dummyNonCoinSellers = [
    {
      userId: 'u6',
      name: 'Steve Rogers',
      email: 'steve.r@example.com'
    },
    {
      userId: 'u7',
      name: 'Thor Odinson',
      email: 'thor.o@example.com'
    },
    {
      userId: 'u8',
      name: 'Clint Barton',
      email: 'clint.b@example.com'
    },
    {
      userId: 'u9',
      name: 'Wanda Maximoff',
      email: 'wanda.m@example.com'
    },
    {
      userId: 'u10',
      name: 'Vision',
      email: 'vision@example.com'
    }
  ]

  const dummySoloCoinSellers = [
    {
      userId: 'scs1',
      name: 'Scott Lang',
      email: 'scott.l@example.com',
      isVerified: true,
      referredBy: null,
      coinsBalance: 750000
    },
    {
      userId: 'scs2',
      name: 'Hope Pym',
      email: 'hope.p@example.com',
      isVerified: true,
      referredBy: 'admin1',
      coinsBalance: 1250000
    },
    {
      userId: 'scs3',
      name: 'Hank Pym',
      email: 'hank.p@example.com',
      isVerified: false,
      referredBy: 'hope.p@example.com',
      coinsBalance: 450000
    },
    {
      userId: 'scs4',
      name: 'Janet Van Dyne',
      email: 'janet.v@example.com',
      isVerified: true,
      referredBy: null,
      coinsBalance: 2100000
    },
    {
      userId: 'scs5',
      name: 'Bill Foster',
      email: 'bill.f@example.com',
      isVerified: true,
      referredBy: 'hank.p@example.com',
      coinsBalance: 890000
    }
  ]

  useEffect(() => {
    loadMerchants()
  }, [])

  const loadMerchants = async () => {
    setLoading(true)
    // Simulate API delay
    setTimeout(() => {
      setMerchants(dummyMerchants)
      setMerchantCoinSellers(dummyCoinSellers)
      setLoading(false)
    }, 800)
  }

  const loadNonMerchants = async () => {
    // Simulate API delay
    setTimeout(() => {
      setNonMerchants(dummyNonMerchants)
    }, 300)
  }

  const loadNonCoinSellers = async () => {
    // Simulate API delay
    setTimeout(() => {
      setNonCoinSellers(dummyNonCoinSellers)
    }, 300)
  }

  const loadSoloCoinSellers = async () => {
    setLoading(true)
    // Simulate API delay
    setTimeout(() => {
      setSoloCoinSellers(dummySoloCoinSellers)
      setLoading(false)
    }, 800)
  }

  const handleTabChange = (tab) => {
    setActiveTab(tab)
    setSearchTerm('')
    if (tab === 'assign-merchant') {
      loadNonMerchants()
    } else if (tab === 'assign-coin-seller') {
      loadNonCoinSellers()
    } else if (tab === 'solo-coin-sellers') {
      loadSoloCoinSellers()
    }
  }

  const handleAssignMerchant = async () => {
    if (!selectedUser) return

    if (!confirm(`Assign ${selectedUser.name || selectedUser.email} as Merchant?`)) {
      return
    }

    setAssigning(true)
    // Simulate API call
    setTimeout(() => {
      alert('✅ Merchant role assigned successfully!')
      setSelectedUser(null)
      setReferenceInput('')
      setActiveTab('view')
      
      // Add new merchant to the list
      const newMerchant = {
        userId: selectedUser.userId,
        name: selectedUser.name,
        email: selectedUser.email,
        isVerified: false,
        referredBy: referenceInput.trim() || null,
        coinsBalance: 0
      }
      setMerchants([...merchants, newMerchant])
      setMerchantCoinSellers({
        ...merchantCoinSellers,
        [selectedUser.userId]: []
      })
      
      setAssigning(false)
    }, 1000)
  }

  const handleAssignCoinSeller = async () => {
    if (!selectedMerchant || !selectedCoinSellerUser) return

    if (!confirm(`Assign ${selectedCoinSellerUser.name || selectedCoinSellerUser.email} as Coin Seller under ${selectedMerchant.name || selectedMerchant.email}?`)) {
      return
    }

    setAssigningCoinSeller(true)
    // Simulate API call
    setTimeout(() => {
      alert('✅ Coin Seller role assigned successfully!')
      
      // Add new coin seller to the merchant
      const newCoinSeller = {
        userId: selectedCoinSellerUser.userId,
        name: selectedCoinSellerUser.name,
        email: selectedCoinSellerUser.email,
        referredBy: csReferenceInput.trim() || null
      }
      
      setMerchantCoinSellers({
        ...merchantCoinSellers,
        [selectedMerchant.userId]: [
          ...(merchantCoinSellers[selectedMerchant.userId] || []),
          newCoinSeller
        ]
      })
      
      setSelectedCoinSellerUser(null)
      setSelectedMerchant(null)
      setCsReferenceInput('')
      setActiveTab('view')
      setAssigningCoinSeller(false)
    }, 1000)
  }

  const handleRemoveCoinSeller = async (coinSeller, merchantId) => {
    if (!confirm(`Remove ${coinSeller.name || coinSeller.email} from coin sellers?`)) {
      return
    }

    // Simulate API call
    setTimeout(() => {
      alert('✅ Coin Seller removed successfully!')
      setMerchantCoinSellers({
        ...merchantCoinSellers,
        [merchantId]: merchantCoinSellers[merchantId].filter(cs => cs.userId !== coinSeller.userId)
      })
    }, 500)
  }

  const handleOpenRechargeDialog = async (user, type = 'merchant') => {
    setSelectedMerchantForRecharge(user)
    setRechargeType(type)
    setRechargeAmount('')
    setRechargeNote('')
    setRechargeDialogOpen(true)
  }

  const handleCloseRechargeDialog = () => {
    setRechargeDialogOpen(false)
    setSelectedMerchantForRecharge(null)
    setRechargeType('merchant')
    setRechargeAmount('')
    setRechargeNote('')
  }

  const handleRechargeMerchant = async () => {
    if (!selectedMerchantForRecharge || !rechargeAmount) return

    const amount = parseInt(rechargeAmount)
    if (isNaN(amount) || amount <= 0) {
      alert('⚠️ Please enter a valid amount (must be greater than 0)')
      return
    }

    const userLabel = rechargeType === 'coin_seller' ? 'coin seller' : 'merchant'
    if (!confirm(`Recharge ${selectedMerchantForRecharge.name || selectedMerchantForRecharge.email} (${userLabel}) with ${amount.toLocaleString()} coins?`)) {
      return
    }

    setRecharging(true)
    // Simulate API call
    setTimeout(() => {
      // Update balance in the appropriate list
      if (rechargeType === 'coin_seller') {
        setSoloCoinSellers(soloCoinSellers.map(seller => 
          seller.userId === selectedMerchantForRecharge.userId
            ? { ...seller, coinsBalance: (seller.coinsBalance || 0) + amount }
            : seller
        ))
      } else {
        setMerchants(merchants.map(merchant => 
          merchant.userId === selectedMerchantForRecharge.userId
            ? { ...merchant, coinsBalance: (merchant.coinsBalance || 0) + amount }
            : merchant
        ))
      }

      alert(`✅ Successfully recharged ${amount.toLocaleString()} coins to ${userLabel}!`)
      handleCloseRechargeDialog()
      setRecharging(false)
    }, 1000)
  }

  const toggleMerchantExpansion = (merchantId) => {
    setExpandedMerchants(prev => ({
      ...prev,
      [merchantId]: !prev[merchantId]
    }))
  }

  const filteredMerchants = merchants.filter(merchant =>
    merchant.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    merchant.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    merchant.userId?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const filteredNonMerchants = nonMerchants.filter(user =>
    user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.userId?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const filteredNonCoinSellers = nonCoinSellers.filter(user =>
    user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.userId?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const filteredSoloCoinSellers = soloCoinSellers.filter(user =>
    user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.userId?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const totalCoinSellers = Object.values(merchantCoinSellers).reduce(
    (sum, sellers) => sum + sellers.length,
    0
  )

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-primary-gold"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-r from-primary-blue to-primary-gold p-6 rounded-lg shadow-lg text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">Total Merchants</p>
              <p className="text-3xl font-bold">{merchants.length}</p>
            </div>
            <Store size={48} className="opacity-80" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 rounded-lg shadow-lg text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">Total Coin Sellers</p>
              <p className="text-3xl font-bold">{totalCoinSellers}</p>
            </div>
            <Users size={48} className="opacity-80" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-6 rounded-lg shadow-lg text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">Avg. CS per Merchant</p>
              <p className="text-3xl font-bold">
                {merchants.length > 0 ? (totalCoinSellers / merchants.length).toFixed(1) : '0'}
              </p>
            </div>
            <Users size={48} className="opacity-80" />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-card p-4 rounded-lg shadow-lg border border-primary-gold/20">
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => handleTabChange('view')}
            className={`px-6 py-2 rounded-lg font-semibold transition-all ${
              activeTab === 'view'
                ? 'bg-gradient-to-r from-primary-blue to-primary-gold text-white shadow-lg'
                : 'bg-background text-text-secondary hover:bg-input-border'
            }`}
          >
            View Merchants
          </button>
          <button
            onClick={() => handleTabChange('solo-coin-sellers')}
            className={`px-6 py-2 rounded-lg font-semibold transition-all ${
              activeTab === 'solo-coin-sellers'
                ? 'bg-gradient-to-r from-primary-blue to-primary-gold text-white shadow-lg'
                : 'bg-background text-text-secondary hover:bg-input-border'
            }`}
          >
            <Users size={16} className="inline mr-2" />
            Solo Coin Sellers
          </button>
          <button
            onClick={() => handleTabChange('assign-merchant')}
            className={`px-6 py-2 rounded-lg font-semibold transition-all ${
              activeTab === 'assign-merchant'
                ? 'bg-gradient-to-r from-primary-blue to-primary-gold text-white shadow-lg'
                : 'bg-background text-text-secondary hover:bg-input-border'
            }` }
          >
            <Plus size={16} className="inline mr-2" />
            Assign Merchant
          </button>
          <button
            onClick={() => handleTabChange('assign-coin-seller')}
            className={`px-6 py-2 rounded-lg font-semibold transition-all ${
              activeTab === 'assign-coin-seller'
                ? 'bg-gradient-to-r from-primary-blue to-primary-gold text-white shadow-lg'
                : 'bg-background text-text-secondary hover:bg-input-border'
            }`}
          >
            <Plus size={16} className="inline mr-2" />
            Assign Coin Seller
          </button>
        </div>
      </div>

      
      {activeTab === 'view' && (
        <div className="space-y-4">
          {/* Search */}
          <div className="bg-card p-4 rounded-lg shadow-lg border border-primary-gold/20">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Search merchants..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 px-4 py-2 border-2 border-input-border rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-primary-blue bg-input-fill transition-all"
              />
              <button className="px-6 py-2 bg-gradient-to-r from-primary-blue to-primary-gold text-white rounded-lg hover:from-primary-blue/90 hover:to-primary-gold/90 flex items-center gap-2 shadow-lg transition-all">
                <Search size={20} />
              </button>
            </div>
          </div>

          {/* Merchants List */}
          <div className="space-y-3">
            {filteredMerchants.map(merchant => {
              const coinSellers = merchantCoinSellers[merchant.userId] || []
              const isExpanded = expandedMerchants[merchant.userId]

              return (
                <div key={merchant.userId} className="bg-card rounded-lg shadow-lg border border-primary-gold/20 overflow-hidden">
                  <div
                    onClick={() => toggleMerchantExpansion(merchant.userId)}
                    className="p-4 cursor-pointer hover:bg-background transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary-blue to-primary-gold flex items-center justify-center text-white font-bold text-lg">
                          {(merchant.name || merchant.email)?.[0]?.toUpperCase()}
                        </div>
                        <div>
                          <p className="font-semibold text-text-primary">
                            {merchant.name || merchant.email}
                            {merchant.isVerified && (
                              <span className="ml-2 text-primary-blue">✓</span>
                            )}
                          </p>
                          <p className="text-sm text-text-secondary">{merchant.email}</p>
                          <p className="text-xs text-text-hint">ID: {merchant.userId}</p>
                          {merchant.referredBy && (
                            <p className="text-xs text-text-hint italic">Ref: {merchant.referredBy}</p>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="px-4 py-2 rounded-lg font-bold text-white bg-blue-500">
                          {coinSellers.length} CS
                        </div>
                        {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                      </div>
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="px-4 pb-4 bg-background/50">
                      {/* Merchant Balance & Recharge */}
                      <div className="border-t border-divider pt-3 mb-4">
                        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-primary-blue/10 to-primary-gold/10 rounded-lg">
                          <div>
                            <p className="text-sm text-text-secondary mb-1">Coin Balance</p>
                            <p className="text-2xl font-bold text-primary-blue">
                              {(merchant.coinsBalance || 0).toLocaleString()} coins
                            </p>
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              handleOpenRechargeDialog(merchant)
                            }}
                            className="px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 flex items-center gap-2 shadow-lg transition-all"
                          >
                            <DollarSign size={20} />
                            Recharge
                          </button>
                        </div>
                      </div>

                      {/* Coin Sellers Section */}
                      <div className="border-t border-divider pt-3">
                        <p className="font-semibold text-sm mb-2">Coin Sellers ({coinSellers.length}):</p>
                        {coinSellers.length === 0 ? (
                          <p className="text-sm text-text-hint italic">No coin sellers yet</p>
                        ) : (
                          <div className="space-y-2">
                            {coinSellers.map(cs => (
                              <div key={cs.userId} className="flex items-center justify-between p-3 bg-card rounded-lg border border-input-border">
                                <div className="flex items-center gap-3">
                                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-bold text-sm">
                                    {(cs.name || cs.email)?.[0]?.toUpperCase()}
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium">{cs.name || cs.email}</p>
                                    <p className="text-xs text-text-hint">ID: {cs.userId}</p>
                                    {cs.referredBy && (
                                      <p className="text-xs text-text-hint italic">Ref: {cs.referredBy}</p>
                                    )}
                                  </div>
                                </div>
                                <button
                                  onClick={() => handleRemoveCoinSeller(cs, merchant.userId)}
                                  className="p-2 text-error hover:bg-error/10 rounded-lg transition-all"
                                >
                                  <Trash2 size={16} />
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      )}

      {activeTab === 'assign-merchant' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-card p-4 rounded-lg shadow-lg border border-primary-gold/20 mb-4">
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border-2 border-input-border rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-primary-blue bg-input-fill transition-all"
              />
            </div>

            <div className="bg-card rounded-lg shadow-lg border border-primary-gold/20 max-h-[600px] overflow-y-auto">
              {filteredNonMerchants.map(user => (
                <div
                  key={user.userId}
                  onClick={() => setSelectedUser(user)}
                  className={`p-4 cursor-pointer border-b border-divider transition-all ${
                    selectedUser?.userId === user.userId
                      ? 'bg-gradient-to-r from-primary-blue/10 to-primary-gold/10'
                      : 'hover:bg-background'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary-blue to-primary-gold flex items-center justify-center text-white font-bold">
                      {(user.name || user.email)?.[0]?.toUpperCase()}
                    </div>
                    <div>
                      <p className="font-medium">{user.name || user.email}</p>
                      <p className="text-sm text-text-secondary">{user.email}</p>
                      <p className="text-xs text-text-hint">ID: {user.userId}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-1">
            {selectedUser ? (
              <div className="bg-card rounded-lg shadow-lg p-6 border border-primary-gold/20">
                <h3 className="text-lg font-bold mb-4">Assign Merchant Role</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">User</label>
                    <div className="p-3 bg-background rounded-lg">
                      <p className="font-medium">{selectedUser.name || selectedUser.email}</p>
                      <p className="text-sm text-text-secondary">{selectedUser.email}</p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">Reference (Optional)</label>
                    <input
                      type="text"
                      value={referenceInput}
                      onChange={(e) => setReferenceInput(e.target.value)}
                      placeholder="Who referred this merchant?"
                      className="w-full px-3 py-2 border-2 border-input-border rounded-lg focus:ring-2 focus:ring-primary-blue bg-input-fill"
                    />
                  </div>

                  <button
                    onClick={handleAssignMerchant}
                    disabled={assigning}
                    className="w-full bg-gradient-to-r from-primary-blue to-primary-gold text-white py-3 rounded-lg font-semibold disabled:opacity-50 shadow-lg transition-all"
                  >
                    {assigning ? 'Assigning...' : 'Assign as Merchant'}
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-card rounded-lg shadow-lg p-6 text-center border border-primary-gold/20">
                <Store className="w-16 h-16 mx-auto mb-4 text-primary-gold" />
                <p className="text-text-secondary">Select a user to assign as merchant</p>
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'assign-coin-seller' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            {/* Info Banner */}
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-lg p-4">
              <p className="text-sm font-semibold text-indigo-900 mb-1">📌 Merchant-Attached Coin Seller</p>
              <p className="text-xs text-indigo-700">
                This assigns a coin seller <strong>under a specific merchant</strong>. 
                For independent/solo coin sellers, use <strong>Role Management</strong> instead.
              </p>
            </div>

            {/* Merchant Selection */}
            <div className="bg-card p-4 rounded-lg shadow-lg border border-primary-gold/20">
              <label className="block text-sm font-semibold mb-2">Select Merchant</label>
              <select
                value={selectedMerchant?.userId || ''}
                onChange={(e) => {
                  const merchant = merchants.find(m => m.userId === e.target.value)
                  setSelectedMerchant(merchant)
                }}
                className="w-full px-4 py-2 border-2 border-input-border rounded-lg focus:ring-2 focus:ring-primary-blue bg-input-fill"
              >
                <option value="">Choose a merchant...</option>
                {merchants.map(merchant => {
                  const csCount = (merchantCoinSellers[merchant.userId] || []).length
                  return (
                    <option key={merchant.userId} value={merchant.userId}>
                      {merchant.name || merchant.email} - ({csCount}/3 CS)
                    </option>
                  )
                })}
              </select>
            </div>

            {/* User Search */}
            <div className="bg-card p-4 rounded-lg shadow-lg border border-primary-gold/20">
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border-2 border-input-border rounded-lg focus:ring-2 focus:ring-primary-blue bg-input-fill"
              />
            </div>

            {/* User List */}
            <div className="bg-card rounded-lg shadow-lg border border-primary-gold/20 max-h-[500px] overflow-y-auto">
              {filteredNonCoinSellers.map(user => (
                <div
                  key={user.userId}
                  onClick={() => setSelectedCoinSellerUser(user)}
                  className={`p-4 cursor-pointer border-b border-divider transition-all ${
                    selectedCoinSellerUser?.userId === user.userId
                      ? 'bg-gradient-to-r from-primary-blue/10 to-primary-gold/10'
                      : 'hover:bg-background'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary-blue to-primary-gold flex items-center justify-center text-white font-bold">
                      {(user.name || user.email)?.[0]?.toUpperCase()}
                    </div>
                    <div>
                      <p className="font-medium">{user.name || user.email}</p>
                      <p className="text-sm text-text-secondary">{user.email}</p>
                      <p className="text-xs text-text-hint">ID: {user.userId}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-1">
            {selectedMerchant && selectedCoinSellerUser ? (
              <div className="bg-card rounded-lg shadow-lg p-6 border border-primary-gold/20">
                <h3 className="text-lg font-bold mb-4">Assign Coin Seller</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Merchant</label>
                    <div className="p-3 bg-background rounded-lg">
                      <p className="font-medium">{selectedMerchant.name || selectedMerchant.email}</p>
                      <p className="text-xs text-text-hint">
                        {(merchantCoinSellers[selectedMerchant.userId] || []).length}/3 Coin Sellers
                      </p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">User</label>
                    <div className="p-3 bg-background rounded-lg">
                      <p className="font-medium">{selectedCoinSellerUser.name || selectedCoinSellerUser.email}</p>
                      <p className="text-sm text-text-secondary">{selectedCoinSellerUser.email}</p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">Reference (Optional)</label>
                    <input
                      type="text"
                      value={csReferenceInput}
                      onChange={(e) => setCsReferenceInput(e.target.value)}
                      placeholder="Who referred this coin seller?"
                      className="w-full px-3 py-2 border-2 border-input-border rounded-lg focus:ring-2 focus:ring-primary-blue bg-input-fill"
                    />
                  </div>

                  <button
                    onClick={handleAssignCoinSeller}
                    disabled={assigningCoinSeller}
                    className="w-full bg-gradient-to-r from-primary-blue to-primary-gold text-white py-3 rounded-lg font-semibold disabled:opacity-50 shadow-lg"
                  >
                    {assigningCoinSeller ? 'Assigning...' : 'Assign as Coin Seller'}
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-card rounded-lg shadow-lg p-6 text-center border border-primary-gold/20">
                <Users className="w-16 h-16 mx-auto mb-4 text-primary-gold" />
                <p className="text-text-secondary">
                  {!selectedMerchant
                    ? 'Select a merchant first'
                    : 'Select a user to assign as coin seller'}
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Solo Coin Sellers Tab */}
      {activeTab === 'solo-coin-sellers' && (
        <div className="space-y-4">
          {/* Search */}
          <div className="bg-card p-4 rounded-lg shadow-lg border border-primary-gold/20">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Search solo coin sellers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 px-4 py-2 border-2 border-input-border rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-primary-blue bg-input-fill transition-all"
              />
              <button className="px-6 py-2 bg-gradient-to-r from-primary-blue to-primary-gold text-white rounded-lg hover:from-primary-blue/90 hover:to-primary-gold/90 flex items-center gap-2 shadow-lg transition-all">
                <Search size={20} />
              </button>
            </div>
          </div>

          {/* Solo Coin Sellers List */}
          <div className="space-y-3">
            {filteredSoloCoinSellers.length === 0 ? (
              <div className="bg-card p-8 rounded-lg shadow-lg border border-primary-gold/20 text-center">
                <Users className="w-16 h-16 mx-auto mb-4 text-text-hint" />
                <p className="text-text-secondary">No solo coin sellers found</p>
                <p className="text-sm text-text-hint mt-2">Solo coin sellers are assigned through Role Management</p>
              </div>
            ) : (
              filteredSoloCoinSellers.map(coinSeller => (
                <div key={coinSeller.userId} className="bg-card rounded-lg shadow-lg border border-primary-gold/20 overflow-hidden">
                  <div className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-500 to-green-600 flex items-center justify-center text-white font-bold text-lg">
                          {(coinSeller.name || coinSeller.email)?.[0]?.toUpperCase()}
                        </div>
                        <div>
                          <p className="font-semibold text-text-primary">
                            {coinSeller.name || coinSeller.email}
                            {coinSeller.isVerified && (
                              <span className="ml-2 text-primary-blue">✓</span>
                            )}
                          </p>
                          <p className="text-sm text-text-secondary">{coinSeller.email}</p>
                          <p className="text-xs text-text-hint">ID: {coinSeller.userId}</p>
                          {coinSeller.referredBy && (
                            <p className="text-xs text-text-hint italic">Ref: {coinSeller.referredBy}</p>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-sm text-text-secondary mb-1">Coin Balance</p>
                          <p className="text-xl font-bold text-green-600">
                            {(coinSeller.coinsBalance || 0).toLocaleString()} coins
                          </p>
                        </div>
                        <button
                          onClick={() => handleOpenRechargeDialog(coinSeller, 'coin_seller')}
                          className="px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 flex items-center gap-2 shadow-lg transition-all"
                        >
                          <DollarSign size={20} />
                          Recharge
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Recharge Dialog */}
      {rechargeDialogOpen && selectedMerchantForRecharge && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={handleCloseRechargeDialog}>
          <div className="bg-card rounded-lg shadow-2xl p-6 max-w-md w-full mx-4" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-xl font-bold mb-4 text-primary-blue">
              {rechargeType === 'coin_seller' ? 'Recharge Coin Seller' : 'Recharge Merchant'}
            </h3>

            <div className="space-y-4">
              {/* User Info */}
              <div className="p-4 bg-background rounded-lg">
                <p className="text-sm text-text-secondary mb-1">
                  {rechargeType === 'coin_seller' ? 'Coin Seller' : 'Merchant'}
                </p>
                <p className="font-semibold">{selectedMerchantForRecharge.name || selectedMerchantForRecharge.email}</p>
                <p className="text-xs text-text-hint mt-1">ID: {selectedMerchantForRecharge.userId}</p>
                <p className="text-sm text-text-secondary mt-2">
                  Current Balance: <span className="font-bold text-primary-blue">{(selectedMerchantForRecharge.coinsBalance || 0).toLocaleString()}</span> coins
                </p>
              </div>

              {/* Amount Input */}
              <div>
                <label className="block text-sm font-semibold mb-2">Recharge Amount (coins)</label>
                <input
                  type="number"
                  value={rechargeAmount}
                  onChange={(e) => setRechargeAmount(e.target.value)}
                  placeholder="Enter amount (e.g., 1000000)"
                  className="w-full px-4 py-2 border-2 border-input-border rounded-lg focus:ring-2 focus:ring-primary-blue bg-input-fill"
                  min="1"
                />
                <p className="text-xs text-text-hint mt-1">
                  No maximum limit for admin recharges
                </p>
              </div>

              {/* Note Input */}
              <div>
                <label className="block text-sm font-semibold mb-2">Note (optional)</label>
                <textarea
                  value={rechargeNote}
                  onChange={(e) => setRechargeNote(e.target.value)}
                  placeholder="Add a note about this recharge..."
                  className="w-full px-4 py-2 border-2 border-input-border rounded-lg focus:ring-2 focus:ring-primary-blue bg-input-fill h-20 resize-none"
                />
              </div>

              {/* Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={handleCloseRechargeDialog}
                  disabled={recharging}
                  className="flex-1 px-4 py-2 border-2 border-input-border rounded-lg hover:bg-background transition-all disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleRechargeMerchant}
                  disabled={recharging || !rechargeAmount}
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 shadow-lg transition-all disabled:opacity-50"
                >
                  {recharging ? 'Recharging...' : 'Confirm Recharge'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default MerchantManagement